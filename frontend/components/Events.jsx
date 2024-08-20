import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function Events() {
  return (
    <div className="flex flex-col items-center bg-black text-white p-8 md:p-12 lg:p-16">
      {/* Text Section */}
      <div className="text-left mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
          LOREM IPSUM <span className="text-codestars">DOLOR</span> SIT AMET CONSECTETUR. ODIO
          SAGITTIS RISUS ORNARE <span className="text-codestars">EUISMOD</span> ELEMENTUM
          <span className="text-codestars">FERMENTUM</span> CONSECTETUR. URNA LECTUS.
        </h1>
      </div>

      {/* Flexbox Container */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
        {/* Card Item */}
        <div className="flex-shrink-0 w-full sm:w-[20rem] md:w-[25rem] lg:w-fit min-w-[16rem] p-0 m-0">
          <CardContainer className="inter-var p-0 m-0">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-4 sm:p-6 border m-0">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Code Uncode
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src="/event1.svg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
        
        {/* Repeat for Other Card Items */}
        <div className="flex-shrink-0 w-full sm:w-[20rem] md:w-[25rem] lg:w-fit min-w-[16rem] p-0 m-0">
          <CardContainer className="inter-var p-0 m-0">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-4 sm:p-6 border m-0">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Code Bounty
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src="/event1.svg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        <div className="flex-shrink-0 w-full sm:w-[20rem] md:w-[25rem] lg:w-fit min-w-[16rem] p-0 m-0">
          <CardContainer className="inter-var p-0 m-0">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-4 sm:p-6 border m-0">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Something
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src="/event1.svg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}
