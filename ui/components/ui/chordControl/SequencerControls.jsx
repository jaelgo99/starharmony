import * as React from "react";
import Slider from "./Slider";

function SequencerControls() {
  return (
    <div className="flex flex-col flex-1 shrink basis-0">
      <div className="flex flex-col w-full">
        <div className="flex gap-2 items-center w-full text-center rounded-sm">
          <div className="self-stretch my-auto text-xs font-medium leading-4 text-gray-800 uppercase">
            Prog.
          </div>
          <div className="flex gap-1 items-center self-stretch px-2 py-0.5 my-auto text-xs tracking-tighter text-gray-700 rounded-sm border border border-solid">
            <div className="self-stretch my-auto">Pop Ballad</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/5ae0232bf14843d0b398bd703a0fa64e/1c6d654c5ea805570563c672cc16bb8a0c7420f1b5319efc8f8336730f5e8ad0?apiKey=5ae0232bf14843d0b398bd703a0fa64e&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
          </div>
        </div>
        <div className="flex gap-6 items-center self-center mt-4">
          <Slider label="Steps" value="1/16" />
          <Slider label="Speed" value="1/16" />
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
