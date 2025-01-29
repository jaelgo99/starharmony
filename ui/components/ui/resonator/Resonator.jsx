import * as React from "react";
import KnobControl from "./KnobControl";
import SmallKnobControl from "./SmallKnobControl";

const mainControls = [
  { label: "Mix", value: "50" },
  { label: "Decay", value: "50" },
  { label: "Warp", value: "50" },
  { label: "Noise", value: "50" },
];

const bottomControls = [
  { label: "Tone", value: "50" },
  { label: "Octave", value: "+0" },
  { label: "Detune", value: "0" },
];

function Resonator() {
  return (
    <div className="flex flex-col justify-center self-stretch p-2 my-auto min-w-[240px] w-[240px] h-[542px]">
      <div className="flex overflow-hidden flex-col pb-9 w-full bg-white rounded border border-gray-300 border-solid shadow-md h-full">
        <div className="flex gap-px justify-center items-center w-full text-base leading-6 text-center text-gray-700 whitespace-nowrap px-4 bg-gray-100 border-b border-solid border-b-gray-300">
          <div className="flex shrink-0 self-stretch my-auto w-3 h-3 bg-gray-700 rounded-full fill-gray-700" />
          <div className="gap-2 self-stretch p-2 my-auto">Resonator</div>
        </div>

        <div className="flex flex-col flex-1 px-4">
          <div className="flex flex-col items-center mt-2.5 w-full">
            <div className="flex flex-col gap-8">
              <div className="flex justify-center gap-3">
                {mainControls.slice(0, 2).map((control) => (
                  <div key={control.label} className="w-[80px]">
                    <KnobControl label={control.label} value={control.value} size="large" />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3">
                {mainControls.slice(2, 4).map((control) => (
                  <div key={control.label} className="w-[80px]">
                    <KnobControl label={control.label} value={control.value} size="large" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/5ae0232bf14843d0b398bd703a0fa64e/7ee082ca2017410e9e7dd84298a1ac0048f3f449b63335923fb3f9da338ec790?apiKey=5ae0232bf14843d0b398bd703a0fa64e&"
            alt=""
            className="object-contain mt-2.5 aspect-[200] stroke-[1px] stroke-gray-300 w-full"
          />

          <div className="flex gap-1 items-center justify-center mt-2.5 w-full h-[54px]">
            {bottomControls.map((control) => (
              <SmallKnobControl
                key={control.label}
                label={control.label}
                value={control.value}
              />
            ))}
          </div>

          <div className="flex overflow-hidden flex-col justify-center py-8 mt-8 w-full text-sm leading-5 text-center text-gray-700 rounded-sm border border-gray-400 border-solid min-h-[98px]">
            <div className="flex-1 shrink gap-2 self-stretch p-2 size-full">
              Tool tip goes here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resonator;
