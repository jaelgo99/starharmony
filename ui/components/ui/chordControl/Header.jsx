import React, { useState } from "react";
import { ChevronDown } from 'lucide-react';

function Header({ rootNote, setRootNote, scale, setScale }) {
  const [isRootOpen, setIsRootOpen] = useState(false);
  const [isScaleOpen, setIsScaleOpen] = useState(false);

  const rootNotes = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
  const scales = ['Major', 'Minor', 'Harmonic Minor'];

  return (
    <div className="flex items-center justify-between px-4 w-full font-medium bg-gray-100 border-b border-solid border-b-gray-300">
      <div className="flex gap-4 items-center text-base leading-6 text-center text-gray-700">
        <div className="flex gap-px items-center">
          <div className="flex shrink-0 self-stretch my-auto w-3 h-3 bg-gray-700 rounded-full fill-gray-700" />
          <div className="gap-2 self-stretch p-2 my-auto">Chord Control</div>
        </div>
      </div>
      
      <div className="flex gap-4 items-center h-full">
        {/* Root Note Dropdown */}
        <div className="relative flex justify-center items-center self-stretch px-2 text-center whitespace-nowrap rounded-sm">
          <div className="self-stretch my-auto text-xs leading-4 text-gray-800 uppercase">
            Root
          </div>
          <div 
            className="flex gap-1 items-center self-stretch px-2 py-0.5 my-auto text-sm leading-5 text-gray-700 rounded-sm hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsRootOpen(!isRootOpen)}
          >
            <div className="self-stretch my-auto">{rootNote}</div>
            <ChevronDown className="h-4 w-4" />
          </div>
          
          {isRootOpen && (
            <div className="absolute top-full left-0 mt-1 w-24 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              {rootNotes.map((note) => (
                <div
                  key={note}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setRootNote(note);
                    setIsRootOpen(false);
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scale Dropdown */}
        <div className="relative flex justify-center items-center self-stretch px-2 text-center rounded-sm">
          <div className="self-stretch my-auto text-xs leading-4 text-gray-800 uppercase">
            Scale
          </div>
          <div 
            className="flex gap-1 items-center self-stretch px-2 py-0.5 my-auto text-sm leading-5 text-gray-700 whitespace-nowrap rounded-sm hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsScaleOpen(!isScaleOpen)}
          >
            <div className="self-stretch my-auto">{scale}</div>
            <ChevronDown className="h-4 w-4" />
          </div>
          
          {isScaleOpen && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              {scales.map((scaleType) => (
                <div
                  key={scaleType}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setScale(scaleType);
                    setIsScaleOpen(false);
                  }}
                >
                  {scaleType}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-0.5 text-xs leading-4 text-gray-500 uppercase whitespace-nowrap min-h-[21px] w-[75px]">
        </div>
        
        <button className="gap-2 p-2 text-xs leading-4 text-center text-gray-800 uppercase rounded-sm border border-gray-400 border-solid">
          MIDI IN
        </button>
      </div>
    </div>
  );
}

export default Header;