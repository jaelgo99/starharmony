import * as React from "react";
import { ChevronDown } from 'lucide-react';
import KnobControl from "../../ui/resonator/KnobControl";
import DiscreteKnobControl from "../../ui/resonator/DiscreteKnobControl";

function ArpSection() {
  const [isBoxActive, setIsBoxActive] = React.useState(false);
  const [selectedStyle, setSelectedStyle] = React.useState("Up");
  const [isStyleOpen, setIsStyleOpen] = React.useState(false);
  const [rateValue, setRateValue] = React.useState("1/16");
  const [gateValue, setGateValue] = React.useState(100);

  const arpStyles = ["Up", "Down", "Up/Down", "Down/Up", "Random", "Chord"];
  const rateOptions = ["1/64", "1/32", "1/16", "1/8", "1/4", "1/2", "1/1"];

  return (
    <div className="flex overflow-hidden flex-col grow shrink pb-2 rounded-sm border-l border-gray-300 border-solid border-l-gray-300 w-[160px]">
      <div className="flex flex-col items-start px-4 w-full text-xs font-medium leading-4 text-center text-gray-700 uppercase whitespace-nowrap">
        <div className="gap-1 self-stretch p-2 border-b-2 border-black">
          Arp
        </div>
      </div>
      
      <div className="flex gap-2 items-center px-4 mt-4 w-full text-center whitespace-nowrap rounded-sm">
        <div className="relative flex flex-1">
          <div
            className="flex flex-1 gap-1 justify-between items-center self-stretch px-2 py-0.5 my-auto text-xs text-gray-700 rounded-sm border border-solid cursor-pointer hover:bg-gray-200"
            onClick={() => setIsStyleOpen(!isStyleOpen)}
          >
            <div className="self-stretch my-auto">{selectedStyle}</div>
            <ChevronDown className="h-4 w-4" />
          </div>
          
          {isStyleOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
              {arpStyles.map((style) => (
                <div
                  key={style}
                  className="px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedStyle(style);
                    setIsStyleOpen(false);
                  }}
                >
                  {style}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-4 px-4 mt-4">
        <div className="flex flex-row items-center gap-4">
          <div>
            <DiscreteKnobControl
              label="Rate"
              value={rateValue}
              size="medium"
              options={rateOptions}
              onChange={setRateValue}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={() => setIsBoxActive(!isBoxActive)}
              className={`flex gap-2 rounded-sm border border-gray-400 border-solid h-[22px] min-h-[22px] w-[22px] cursor-pointer hover:bg-gray-200 transition-colors ${
                isBoxActive ? 'bg-gray-700' : ''
              }`}
            />
            <div className="gap-2 pr-px pl-0.5 rounded-sm border border-gray-400 border-solid h-[22px] min-h-[22px] w-[22px]">
              ms
            </div>
          </div>
        </div>

        {/* Second grid cell: Empty */}
        <div className="col-start-1"></div>

        {/* Third grid cell: Gate knob */}
        <div className="col-start-2 row-start-2">
          <KnobControl
            label="Gate"
            value={gateValue}
            size="medium"
            onChange={setGateValue}
          />
        </div>
      </div>
    </div>
  );
}

export default ArpSection;