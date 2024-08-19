import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function Hero() {
  const words1 = ["COMPETITIVE", "DATA STRUCTURES"];
  const words2 = ["PROGRAMMING", "& ALGORITHMS"];

  return (
    <div
      className="relative flex flex-col justify-center items-center w-full h-[40rem] bg-no-repeat bg-cover bg-center xs:h-[40rem] sm:h-[50rem] md:h-[60rem] lg:h-[60rem]"
      style={{
        backgroundImage: `linear-gradient(200deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 80%), url('/codestars.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full mt-10 flex flex-col w-full items-center px-4">
      <div className="w-full flex justify-start mb-2">
      <h2 className="font-semibold mx-4 text-gray-400">DJS CODESTARS</h2>
      </div>
        <div className="w-full flex justify-start mb-0 xs:mb-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-gray-300">
            <FlipWords words={words1} />
          </h2>
        </div>
        <div className="w-full flex justify-end">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-thin text-gray-300">
            <FlipWords words={words2} />
          </h2>
        </div>
      </div>
      {/* Main Content */}
    </div>
  );
}
