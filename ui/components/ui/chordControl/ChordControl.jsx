import * as React from "react";
import ChordWheel from "./ChordWheel";
import ChordDisplay from "./ChordDisplay";
import ArpSection from "./ArpSection";
import SequencerSection from "./SequencerSection";
import Header from "./Header";

function ChordControl() {
  return (
    <div className="flex flex-col justify-center self-stretch p-2 my-auto min-w-[240px] w-[648px] max-md:max-w-full h-full">
      <div className="flex overflow-hidden flex-col pb-2 w-full bg-white rounded border border-gray-300 border-solid shadow-md h-full max-md:max-w-full">
        <Header />
        <div className="flex flex-col flex-1 px-4 w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 pt-4 w-full rounded-sm max-md:max-w-full">
            <div className="flex flex-wrap flex-1 gap-6 pt-1 size-full max-md:max-w-full">
              <div className="flex grow shrink gap-6 h-full text-center whitespace-nowrap min-w-[240px] w-[367px]">
                <ChordWheel />
                <ChordDisplay />
              </div>
              <ArpSection />
            </div>
          </div>
          <SequencerSection />
        </div>
      </div>
    </div>
  );
}

export default ChordControl;
