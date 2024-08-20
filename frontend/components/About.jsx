"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export function About() {
  return (
    <div className="bg-black relative z-10 w-full h-full">
    <WavyBackground className="pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center inline">
        You already 
      </p>
      <p className="text-2xl md:text-4xl lg:text-7xl text-codestars font-bold inter-var text-center inline mx-3">
        have
      </p>
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center inline">
        what it takes.
      </p>
    </WavyBackground>
    </div>
  );
}
