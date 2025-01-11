import * as React from "react";

function KnobControl({ label, value, size = "large" }) {
  const isLarge = size === "large";

  return (
    <div className="flex flex-col grow shrink w-[51px]">
      <div className="flex z-10 flex-col min-h-[92px]">
        <div className="text-xs font-medium leading-4 text-center text-black uppercase">
          {label}
        </div>
        <div className="flex flex-col flex-1 justify-center py-px mt-2 w-full">
          <div
            className={`flex flex-col items-center px-3.5 pt-1 pb-12 ${
              isLarge ? "w-16 h-16" : "w-7 h-7"
            } bg-gray-100 rounded-full border-2 border-gray-300 border-solid`}
          >
            <div className="flex shrink-0 w-1 bg-gray-700 rounded h-[11px]" />
          </div>
        </div>
      </div>
      <div className="z-10 self-center text-xs tracking-tighter text-center text-gray-700">
        {value}
      </div>
    </div>
  );
}

export default KnobControl;
