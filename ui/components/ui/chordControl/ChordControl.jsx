import * as React from "react";
import ChordWheel from "./ChordWheel";
import ChordDisplay from "./ChordDisplay";
import ChordLogicContainer from "./ChordLogicContainer";
import ArpSection from "./ArpSection";
import SequencerSection from "./SequencerSection";
import Header from "./Header";

function ChordControl() {
  return (
    <div className="flex flex-col justify-center self-stretch p-2 my-auto min-w-[240px] w-[648px] max-md:max-w-full h-full">
      
        
                <ChordLogicContainer />
         
    </div>
  );
}

export default ChordControl;
