import * as React from "react";

const MAX_FILL_PERCENTAGE = 100;
// Calculate evenly spaced thresholds for 7 positions
const STEPS = 7; // 7 scale degrees
const MIN_FILL_PERCENTAGE = 15; // Lowest visible position
const STEP = (MAX_FILL_PERCENTAGE - MIN_FILL_PERCENTAGE) / (STEPS - 1); // Divide remaining space evenly

const gridData = [
  { chord: "Gmaj", fillPercentage: 70, isBoxActive: false },
  { chord: "Amin", fillPercentage: 50, isBoxActive: false },
  { chord: "Dmin", fillPercentage: 0, isBoxActive: false },
  { chord: "Amin", fillPercentage: 80, isBoxActive: false },
  { chord: "Gmaj", fillPercentage: 60, isBoxActive: false },
  { chord: "Dmin", fillPercentage: 0, isBoxActive: false },
  { chord: "Gmaj", fillPercentage: 40, isBoxActive: false },
  { chord: "Amin", fillPercentage: 80, isBoxActive: false },
];

const SCALE_DEGREES = [
  { numeral: "vii°", threshold: MAX_FILL_PERCENTAGE },
  { numeral: "vi", threshold: MIN_FILL_PERCENTAGE + STEP * 5 },
  { numeral: "V", threshold: MIN_FILL_PERCENTAGE + STEP * 4 },
  { numeral: "IV", threshold: MIN_FILL_PERCENTAGE + STEP * 3 },
  { numeral: "iii", threshold: MIN_FILL_PERCENTAGE + STEP * 2 },
  { numeral: "ii", threshold: MIN_FILL_PERCENTAGE + STEP },
  { numeral: "I", threshold: MIN_FILL_PERCENTAGE },
];

function getNumeral(percentage) {
  // Find the first degree where percentage is greater than or equal to threshold
  const degree = SCALE_DEGREES.find(d => percentage >= d.threshold - (STEP / 2));
  return degree ? degree.numeral : "I";
}

function snapToNearestThreshold(percentage) {
  // Find the two closest thresholds
  const sortedThresholds = [...SCALE_DEGREES.map(d => d.threshold)];
  let lower = Math.max(...sortedThresholds.filter(t => t <= percentage));
  let upper = Math.min(...sortedThresholds.filter(t => t >= percentage));
  
  // If percentage is closer to upper threshold, snap up, otherwise snap down
  const snapped = Math.abs(percentage - upper) < Math.abs(percentage - lower) ? upper : lower;
  return Math.max(MIN_FILL_PERCENTAGE, snapped);
}

function ChordBox({ item, onDrag }) {
  const boxRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateFillPercentage(e);
  };

  const updateFillPercentage = (e) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const height = rect.height;
      // Invert the percentage calculation
      const rawPercentage = 100 - (mouseY / height * 100);
      const clampedPercentage = Math.max(MIN_FILL_PERCENTAGE, Math.min(MAX_FILL_PERCENTAGE, rawPercentage));
      const snappedPercentage = snapToNearestThreshold(clampedPercentage);
      onDrag(snappedPercentage);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateFillPercentage(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={boxRef}
      className="chord-box relative w-full h-full bg-white border border-gray-700 rounded-sm cursor-ns-resize"
      onMouseDown={handleMouseDown}
    >
      {/* Fill layer */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gray-700 transition-height duration-75"
        style={{ height: `${item.fillPercentage}%` }}
      />
      
      {/* Label layer */}
      <div 
        className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ 
          bottom: `${item.fillPercentage}%`,
          transform: 'translateY(100%)'
        }}
      >
        <span className="text-gray-50 font-medium z-10 select-none">
          {getNumeral(item.fillPercentage)}
        </span>
      </div>
    </div>
  );
}

function SequencerGrid() {
  const [gridItems, setGridItems] = React.useState(gridData);

  const handleDrag = (index, percentage) => {
    setGridItems(items => 
      items.map((item, i) => 
        i === index ? { ...item, fillPercentage: percentage } : item
      )
    );
  };

  const handleBoxClick = (index) => {
    setGridItems(items =>
      items.map((item, i) =>
        i === index ? { ...item, isBoxActive: !item.isBoxActive } : item
      )
    );
  };

  return (
    <div className="flex flex-col self-start min-h-[173px] min-w-[240px] w-[433px] max-md:max-w-full h-full">
      <style jsx>{`
        .sequence-box:not(.active):hover {
          background-color: rgb(243 244 246);
        }
        .chord-box:hover {
          background-color: rgb(243 244 246);
        }
      `}</style>
      <div className="flex gap-0.5 items-start w-full max-md:max-w-full">
        {gridItems.map((item, i) => (
          <div
            key={i}
            className="flex overflow-hidden flex-col flex-1 shrink justify-center py-px basis-0 fill-gray-500"
          >
            <button
              onClick={() => handleBoxClick(i)}
              className={`sequence-box flex shrink-0 rounded-sm border border-gray-700 border-solid h-[23px] cursor-pointer transition-colors ${
                item.isBoxActive ? 'active bg-gray-700' : ''
              }`}
            />
          </div>
        ))}
      </div>
      <div className="flex overflow-hidden flex-1 gap-0.5 mt-2 text-center whitespace-nowrap rounded-sm w-full max-md:max-w-full">
        {gridItems.map((item, index) => (
          <div
            key={index}
            className="flex overflow-hidden flex-col flex-1 shrink basis-0 h-full"
          >
            <div className="flex-1">
              <ChordBox 
                item={item} 
                onDrag={(percentage) => handleDrag(index, percentage)} 
              />
            </div>
            <div className="z-10 self-center mt-2 text-sm font-medium leading-5 text-gray-500">
              {item.chord}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SequencerGrid;
