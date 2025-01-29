import * as React from "react";

const MAX_FILL_PERCENTAGE = 100;
const STEPS = 7;
const MIN_FILL_PERCENTAGE = 15;
const STEP = (MAX_FILL_PERCENTAGE - MIN_FILL_PERCENTAGE) / (STEPS - 1);

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Define the intervals and chord types for each scale degree
const MAJOR_SCALE = {
  intervals: [0, 2, 4, 5, 7, 9, 11],
  chordTypes: ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim']
};

const MINOR_SCALE = {
  intervals: [0, 2, 3, 5, 7, 8, 10],
  chordTypes: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj']
};

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
  const degree = SCALE_DEGREES.find(d => percentage >= d.threshold - (STEP / 2));
  return degree ? degree.numeral : "I";
}

function getChordName(numeral, rootNote, scale) {
  // Convert roman numeral to scale degree (0-6)
  const numeralMap = { "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5, "vii°": 6 };
  const degree = numeralMap[numeral] || 0;

  // Get the scale info
  const scaleInfo = scale === "Major" ? MAJOR_SCALE : MINOR_SCALE;
  
  // Calculate the chord root note
  const rootIndex = NOTES.indexOf(rootNote);
  const interval = scaleInfo.intervals[degree];
  const chordRoot = NOTES[(rootIndex + interval) % 12];
  
  // Get the chord type
  const chordType = scaleInfo.chordTypes[degree];
  
  return `${chordRoot}${chordType}`;
}

function snapToNearestThreshold(percentage) {
  const sortedThresholds = [...SCALE_DEGREES.map(d => d.threshold)];
  let lower = Math.max(...sortedThresholds.filter(t => t <= percentage));
  let upper = Math.min(...sortedThresholds.filter(t => t >= percentage));
  
  const snapped = Math.abs(percentage - upper) < Math.abs(percentage - lower) ? upper : lower;
  return Math.max(MIN_FILL_PERCENTAGE, snapped);
}

function ChordBox({ item, onDrag, rootNote, scale }) {
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

  const currentNumeral = getNumeral(item.fillPercentage);
  const chordName = getChordName(currentNumeral, rootNote, scale);

  return (
    <div 
      ref={boxRef}
      className="chord-box relative w-full h-full bg-white border border-gray-700 rounded-sm cursor-ns-resize"
      onMouseDown={handleMouseDown}
    >
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gray-700 transition-height duration-75"
        style={{ height: `${item.fillPercentage}%` }}
      />
      <div 
        className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ 
          bottom: `${item.fillPercentage}%`,
          transform: 'translateY(100%)'
        }}
      >
        <span className="text-gray-50 font-medium z-10 select-none">
          {currentNumeral}
        </span>
      </div>
    </div>
  );
}

function SequencerGrid({ numSteps = 16, rootNote = "C", scale = "Major" }) {
  const [gridItems, setGridItems] = React.useState([]);

  React.useEffect(() => {
    const newGridItems = Array(numSteps).fill(null).map(() => ({
      fillPercentage: MIN_FILL_PERCENTAGE,
      isBoxActive: false
    }));
    setGridItems(newGridItems);
  }, [numSteps]);

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
    <div className="flex flex-col self-start min-h-[173px] w-full">
      <div className="grid gap-0.5 w-full" style={{ 
        gridTemplateColumns: `repeat(${numSteps}, minmax(0, 1fr))`
      }}>
        {gridItems.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 items-center min-w-0">
            <div className="text-sm font-medium leading-5 text-gray-500 truncate w-full text-center">
              {getChordName(getNumeral(item.fillPercentage), rootNote, scale)}
            </div>
            <button
              onClick={() => handleBoxClick(i)}
              className={`sequence-box w-full rounded-sm border border-gray-700 border-solid h-[23px] cursor-pointer transition-colors ${
                item.isBoxActive ? 'active bg-gray-700' : ''
              }`}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-0.5 mt-2 h-[200px]">
        {gridItems.map((item, index) => (
          <div key={index} className="flex-1 min-w-0">
            <ChordBox 
              item={item} 
              onDrag={(percentage) => handleDrag(index, percentage)}
              rootNote={rootNote}
              scale={scale}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .sequence-box:not(.active):hover {
          background-color: rgb(243 244 246);
        }
        .chord-box:hover {
          background-color: rgb(243 244 246);
        }
      `}</style>
    </div>
  );
}

export default SequencerGrid;