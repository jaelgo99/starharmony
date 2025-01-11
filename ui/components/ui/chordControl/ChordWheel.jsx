import * as React from "react";

function ChordWheel() {
  return (
    <div className="flex flex-col flex-1 shrink justify-center text-base leading-6 basis-0">
      <div className="flex flex-col justify-center items-center w-full min-h-[213px]">
        <div className="flex gap-2 items-center p-1 bg-gray-50 border border-gray-300 border-solid h-[165px] min-h-[165px] rounded-[106.5px] w-[165px]">
          <div className="flex flex-col flex-1 shrink px-5 pt-1 pb-7 w-full basis-0">
            <div className="flex gap-8 items-start self-start text-gray-700 max-md:ml-1">
              <div className="mt-5">vii*</div>
              <div>I</div>
              <div className="self-end mt-6">ii</div>
            </div>
            <div className="flex gap-5 justify-between mt-6 text-gray-700">
              <div>vi</div>
              <div>iii</div>
            </div>
            <div className="flex gap-5 justify-between self-center mt-1.5 w-12">
              <div className="self-start text-gray-200">V</div>
              <div className="text-gray-700">IV</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChordWheel;
