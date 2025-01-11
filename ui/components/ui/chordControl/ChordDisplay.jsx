import * as React from "react";

function ChordDisplay() {
  const chordTypes = ["Maj7", "Min7", "Dom", "Dim7", "Aug7", "+"];

  return (
    <div className="flex overflow-hidden flex-col justify-center items-center text-gray-700 bg-white rounded-sm h-[195px] w-[196px]">
      <div className="flex flex-col flex-1 justify-center items-center px-2 pb-12 w-full">
        <div className="flex flex-col items-center pb-4 text-5xl font-light tracking-tight leading-[72px]">
          <div className="gap-1 self-stretch max-md:text-4xl">Gdom</div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center items-start w-full text-xs font-medium leading-4 max-w-[178px]">
          {chordTypes.map((type) => (
            <div
              key={type}
              className="self-stretch px-2.5 py-0.5 bg-gray-100 rounded-md"
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChordDisplay;
