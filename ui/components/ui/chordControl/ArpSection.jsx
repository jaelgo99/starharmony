import * as React from "react";
import Slider from "./Slider";

function ArpSection() {
  const [isBoxActive, setIsBoxActive] = React.useState(false);

  return (
    <div className="flex overflow-hidden flex-col grow shrink pb-2 rounded-sm border-l border-gray-300 border-solid border-l-gray-300 w-[127px]">
      <div className="flex flex-col items-start px-4 w-full text-xs font-medium leading-4 text-center text-gray-700 uppercase whitespace-nowrap">
        <div className="gap-1 self-stretch p-2 border-b-2 border-black">
          Arp
        </div>
      </div>
      <div className="flex gap-2 items-center px-4 mt-4 w-full text-center whitespace-nowrap rounded-sm">
        <div className="self-stretch my-auto text-xs font-medium leading-4 text-gray-800 uppercase">
          Style
        </div>
        <div className="flex flex-1 shrink gap-10 justify-between items-center self-stretch px-2 py-0.5 my-auto text-xs tracking-tighter text-gray-700 rounded-sm border border border-solid basis-0">
          <div className="self-stretch my-auto">Up</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/5ae0232bf14843d0b398bd703a0fa64e/6526d942db46343a24387fcc6e1ae7ece60cbbe05826a8fd4678743d848577fb?apiKey=5ae0232bf14843d0b398bd703a0fa64e&"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-1 items-center pr-3 pl-4 mt-4 w-full">
        <div className="flex gap-2 items-center self-stretch my-auto w-16">
          <div className="flex flex-col self-stretch my-auto text-xs font-medium leading-4 text-center text-gray-900 whitespace-nowrap w-[22px]">
            <button
              onClick={() => setIsBoxActive(!isBoxActive)}
              className={`flex gap-2 rounded-sm border border-gray-400 border-solid h-[22px] min-h-[22px] w-[22px] cursor-pointer hover:bg-gray-200 transition-colors ${
                isBoxActive ? 'bg-gray-700' : ''
              }`}
            />
            <div className="gap-2 pr-px pl-0.5 mt-2 rounded-sm border border-gray-400 border-solid h-[22px] min-h-[22px] w-[22px]">
              ms
            </div>
          </div>
          <Slider label="Rate" value="1/16" />
        </div>
        <Slider label="Gate" value="100%" />
      </div>
    </div>
  );
}

export default ArpSection;
