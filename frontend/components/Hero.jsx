import React from "react";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";

export function Hero() {
  const words1 = ["COMPETITIVE", "DATA STRUCTURES"];
  const words2 = ["PROGRAMMING", "& ALGORITHMS"];

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen ">
    <div
      className="relative flex flex-col justify-center items-center w-full h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(200deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 80%), url('/codestars.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Image src={'/line.svg'} width={2} height={5} style={{ position: 'absolute', top: '10vh', left: '30vw' }} />
      <Image src={'/line.svg'} width={2} height={5} style={{ position: 'absolute', top: '30vh', right: '20vw' }} />
      
      {/* Overlay Text */}
      <div className="flex flex-col w-full px-4">
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
        <div className="w-full right-0 flex justify-end">
          <h3 className="text-sm lg:w-1/2 text-right sm:text-s md:text-xl lg:text-2xl font-medium text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
        </div>

        {/* Button and Stats */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-between mt-24 items-center gap-8">
          <Button className="px-8 rounded-3xl h-12 text-black font-normal text-lg hover:bg-transparent hover:border-yellow-500 hover:border-2 hover:text-white transition duration-300 ease-in-out">
            Join our community
            <Image src={'/arrow.svg'} height={10} width={10} className="ml-2 hover:fill-white" alt="Arrow Icon"/>
          </Button>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row gap-10 text-center">
            <div>
              <h3 className="text-2xl font-bold text-white">120+</h3>
              <p className="text-sm text-gray-400">Sessions Conducted</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">50+</h3>
              <p className="text-sm text-gray-400">Events Hosted</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">500+</h3>
              <p className="text-sm text-gray-400">Community Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
