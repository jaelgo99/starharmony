import * as React from "react";

function Header() {
  return (
    <div className="flex items-center justify-between px-4 w-full font-medium bg-gray-100 border-b border-solid border-b-gray-300">
      <div className="flex gap-4 items-center text-base leading-6 text-center text-gray-700">
        <div className="flex gap-px items-center">
          <div className="flex shrink-0 self-stretch my-auto w-3 h-3 bg-gray-700 rounded-full fill-gray-700" />
          <div className="gap-2 self-stretch p-2 my-auto">Chord Control</div>
        </div>
      </div>
      <div className="flex gap-4 items-center h-full">
        <div className="flex justify-center items-center self-stretch px-2 text-center whitespace-nowrap rounded-sm">
          <div className="self-stretch my-auto text-xs leading-4 text-gray-800 uppercase">
            Root
          </div>
          <div className="flex gap-1 items-center self-stretch px-2 py-0.5 my-auto text-sm leading-5 text-gray-700 rounded-sm">
            <div className="self-stretch my-auto">C</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/5ae0232bf14843d0b398bd703a0fa64e/e5cabd9ebd01b036453e3eddf11431dc74ec0bafa7aa5c570e16e203fc7d427f?apiKey=5ae0232bf14843d0b398bd703a0fa64e&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
          </div>
        </div>
        <div className="flex justify-center items-center self-stretch px-2 text-center rounded-sm">
          <div className="self-stretch my-auto text-xs leading-4 text-gray-800 uppercase">
            Scale{" "}
          </div>
          <div className="flex gap-1 items-center self-stretch px-2 py-0.5 my-auto text-sm leading-5 text-gray-700 whitespace-nowrap rounded-sm">
            <div className="self-stretch my-auto">Major</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/5ae0232bf14843d0b398bd703a0fa64e/6526d942db46343a24387fcc6e1ae7ece60cbbe05826a8fd4678743d848577fb?apiKey=5ae0232bf14843d0b398bd703a0fa64e&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-xs leading-4 text-gray-500 uppercase whitespace-nowrap min-h-[21px] w-[75px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/5ae0232bf14843d0b398bd703a0fa64e/08ef90e85e41bd07e0614895b78ffab492eb5ee73f79331d85fbe475607cece8?apiKey=5ae0232bf14843d0b398bd703a0fa64e&"
            alt=""
            className="object-contain shrink-0 w-6 aspect-[1.72]"
          />
          <div>7ths</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/5ae0232bf14843d0b398bd703a0fa64e/6cb75b781de4be3cacd3bc3fe0eb66456b733d315020274dc86a28029128f5fb?apiKey=5ae0232bf14843d0b398bd703a0fa64e&"
            alt=""
            className="object-contain shrink-0 w-5 aspect-square"
          />
        </div>
        <button className="gap-2 p-2 text-xs leading-4 text-center text-gray-800 uppercase rounded-sm border border-gray-400 border-solid">
          MIDI IN
        </button>
      </div>
    </div>
  );
}

export default Header;
