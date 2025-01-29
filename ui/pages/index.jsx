import * as React from "react";
import ChordControl from "../components/ui/chordControl/ChordControl";
import Resonator from "../components/ui/resonator/Resonator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p- bg-gray-50">
      <div className="flex flex-wrap gap-2 justify-center items-stretch w-full">
        <ChordControl />
        <Resonator />
      </div>
    </main>
  );
} 