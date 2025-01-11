import * as React from "react";
import ChordControl from "../ui/components/ui/chordControl/ChordControl";
import Resonator from "../ui/components/ui/resonator/Resonator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <div className="flex flex-wrap gap-6 justify-center items-start w-full">
        <ChordControl />
        <Resonator />
      </div>
    </main>
  );
} 