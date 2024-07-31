"use client";

import classNames from "classnames";
import { useInView } from "react-intersection-observer";




export const HeroImage = () => {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
 

 


  return (
    <div ref={ref} className="md:mt-20 mt-8 [perspective:2000px] hidden md:block ">
      <div
        className={classNames(
          "relative rounded-lg bg-white bg-opacity-[0.01] bg-hero-gradient",
          inView ? "animate-image-rotate" : "[transform:rotateX(25deg)]",
          "before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-hero-glow before:opacity-0 before:[filter:blur(120px)]",
          inView && "before:animate-image-glow"
        )}
      >
      

        <img
          className={classNames(
            "relative z-10 transition-opacity delay-[680ms]",
            inView ? "opacity-100" : "opacity-0"
          )}
          src="/light3.png"
          alt="Hero image"
        />
        
      </div>
    </div>
  );
};