import React from "react";

function ChordDisplay({ 
  showSevenths, 
  displayedChord, 
  selectedChordType, 
  setSelectedChordType,
  defaultChordType,
  showExtendedChords,
  setShowExtendedChords,
  extendedChords
}) {
  const baseChordTypes = showSevenths
    ? ["Maj7", "Min7", "Dom7", "Dim7", "ø7", "+"]
    : ["Maj", "Min", "Dom", "Dim", "Aug", "+"];

  return (
    <div className="relative flex flex-col justify-center items-center text-gray-700 bg-white rounded-sm h-[195px] w-[196px]">
      <div className="flex flex-col flex-1 justify-center items-center px-2 pb-12 w-full">
        <div className="flex flex-col items-center pb-4 text-5xl font-light tracking-tight leading-[72px]">
          <div className="gap-1 self-stretch max-md:text-4xl">
            {displayedChord}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center items-start w-full text-xs font-medium leading-4 max-w-[178px]">
          {baseChordTypes.map((type) => (
            <div
              key={type}
              onClick={() => {
                console.log('Clicked type:', type);
                if (type === '+') {
                  console.log('Toggling extended chords');
                  setShowExtendedChords(!showExtendedChords);
                } else {
                  setSelectedChordType(type);
                  setShowExtendedChords(false);
                }
              }}
              className={`
                self-stretch px-2.5 py-0.5 rounded-md cursor-pointer
                transition-colors duration-200
                ${type === selectedChordType
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                ${type === defaultChordType && type !== selectedChordType
                  ? 'ring-1 ring-gray-400'
                  : ''
                }
              `}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* Extended Chords Dropdown */}
      {showExtendedChords && (
        <div 
          className="absolute bg-white shadow-lg rounded-md border border-gray-200 z-[100]"
          style={{
            top: '160px', // Match the height of the parent container
            left: '0',
            width: '100%',
            marginTop: '0.5rem'
          }}
        >
          <div className="p-2">
            <div className="grid grid-cols-2 gap-2">
              {extendedChords.map((chord) => (
                <div
                  key={chord}
                  onClick={() => {
                    setSelectedChordType(chord);
                    setShowExtendedChords(false);
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-center"
                >
                  {chord}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChordDisplay;