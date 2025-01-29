import * as React from "react";
import SequencerControls from "./SequencerControls";
import SequencerGrid from "./SequencerGrid";

function SequencerSection({ rootNote, scale }) {
  const [numSteps, setNumSteps] = React.useState(16);

  return (
    <div className="flex flex-1 gap-2 border-t border-solid border-t-gray-300 size-full max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink px-2 w-full rounded-sm basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex gap-2 items-start w-full text-xs font-medium leading-4 text-center text-gray-700 uppercase whitespace-nowrap max-md:max-w-full">
          <div className="flex gap-6 items-center min-w-[240px] w-[302px]">
            <div className="gap-2 self-stretch p-2 my-auto border-b-2 border-black">
              Sequencer
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-2 size-full max-md:max-w-full">
          <SequencerControls 
            onStepsChange={setNumSteps}
          />
          <SequencerGrid 
            numSteps={numSteps}
            rootNote={rootNote}
            scale={scale}
          />
        </div>
      </div>
    </div>
  );
}

export default SequencerSection;