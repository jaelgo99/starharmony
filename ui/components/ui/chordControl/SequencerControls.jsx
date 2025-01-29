import * as React from "react";
import { ChevronDown } from 'lucide-react';
import DiscreteKnobControl from "../../ui/resonator/DiscreteKnobControl";

function SequencerControls({ onStepsChange }) {
  const [stepsValue, setStepsValue] = React.useState("16");
  const [speedValue, setSpeedValue] = React.useState("1/16");
  const [selectedProgression, setSelectedProgression] = React.useState("Pop Ballad");
  const [isProgressionOpen, setIsProgressionOpen] = React.useState(false);

  const stepOptions = ["4", "8", "16"];
  const speedValues = ["0.25x", "0.5x", "1x", "2x", "4x"];
  const progressions = [
    "Pop Ballad",
    "Blues",
    "Jazz Standard",
    "Rock",
    "Classical",
    "Soul",
    "R&B"
  ];

  const handleStepsChange = (value) => {
    setStepsValue(value);
    onStepsChange(parseInt(value));
  };

  return (
    <div className="flex flex-col flex-1 shrink basis-0">
      <div className="flex flex-col w-full">
        <div className="flex gap-2 items-center px-1 w-full text-center rounded-sm">
          <div className="relative flex flex-1">
            <div
              className="flex w-full gap-1 justify-between items-center self-stretch px-2 py-0.5 text-xs text-gray-700 rounded-sm border border-solid cursor-pointer hover:bg-gray-200"
              onClick={() => setIsProgressionOpen(!isProgressionOpen)}
            >
              <div className="self-stretch">{selectedProgression}</div>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            {isProgressionOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
                {progressions.map((progression) => (
                  <div
                    key={progression}
                    className="px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedProgression(progression);
                      setIsProgressionOpen(false);
                    }}
                  >
                    {progression}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-6 items-center justify-center mt-4">
          <DiscreteKnobControl
            label="Steps"
            value={stepsValue}
            size="medium"
            options={stepOptions}
            onChange={handleStepsChange}
          />
          <DiscreteKnobControl
            label="Speed"
            value={speedValue}
            size="medium"
            options={speedValues}
            onChange={setSpeedValue}
          />
        </div>
      </div>

      <button className="flex flex-col justify-center self-center py-2 mt-8 text-xs font-medium leading-4 text-center text-gray-500 border-t border-solid border-t-gray-300">
        <div className="flex gap-2 items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/5ae0232bf14843d0b398bd703a0fa64e/96385e172f922bf8fe8b41f6eb0251c5f00ce790dac8f8348b6487033f8aafd8?apiKey=5ae0232bf14843d0b398bd703a0fa64e&"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
          />
          <div className="self-stretch my-auto">Try Your Luck</div>
        </div>
      </button>
    </div>
  );
}

export default SequencerControls;