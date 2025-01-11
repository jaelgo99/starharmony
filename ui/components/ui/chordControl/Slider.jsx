import * as React from "react";

function Slider({ label, value }) {
  return (
    <div className="flex flex-col self-stretch my-auto w-16">
      <div className="flex z-10 flex-col min-h-[92px]">
        <div className="text-xs font-medium leading-4 text-center text-gray-700 uppercase">
          {label}
        </div>
        <div className="flex flex-col justify-center self-center py-px mt-1 w-7">
          <div className="flex flex-col items-center px-1.5 pb-5 w-full h-7 bg-gray-100 rounded-full border-2 border-gray-300 border-solid">
            <div className="flex z-10 shrink-0 w-1 h-2 bg-gray-700 rounded-sm" />
          </div>
        </div>
        <div className="mt-1 text-xs tracking-tighter text-center text-gray-700">
          {value}
        </div>
      </div>
    </div>
  );
}

export default Slider;
