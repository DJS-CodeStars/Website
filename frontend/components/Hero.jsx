import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function Hero() {
  const words = ["better", "cute", "beautiful", "modern"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4 w-full">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Become
        <FlipWords words={words} /> <br />
        with DJS CodeStars
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}
