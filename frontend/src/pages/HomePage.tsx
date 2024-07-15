
import { AvatarCirclesUrl } from "@/components/Avatarurl";
import BentoComp from "@/components/BentoComp";
import Container from "@/components/Container";
import Faq from "@/components/Faq";
import { Hero, HeroSubtitle, HeroTitle } from "@/components/Hero";
import { HeroImage } from "@/components/HeroImage";
import LogoTicker from "@/components/LogoTicker";
import { MarqueeComp } from "@/components/MarqueeComp";
import { TextRevealComp } from "@/components/TextRevealComp";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  
  return (
    
    <Container>
      <div className="z-10 translate-y-[-1rem] mt-24 animate-fade-in opacity-0 [--animation-delay:100ms] flex lg:min-h-[10rem] md:min-h-[7rem] min-h-[5rem] items-center justify-center">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-zinc-900 dark:hover:bg-neutral-800",
          )}
        >
          <AnimatedShinyText className="inline-flex md:text-sm text-xs items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600  hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Introducing viralxpost AI</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </div>
      <Hero>
        <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          Start Generating Viral Tweets Today <br className="hidden md:inline-block " /> Let {" "}
          <Link to="/" className="underline">viralxpost</Link> Be Your Guide.
        </HeroTitle>
        <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Let our AI tool help you create engaging content that breaks <br className="hidden md:block" /> through the noise and gets you seen by the right people.
        </HeroSubtitle>
        <Link to="#">
          <Button className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
            Get Started For Free
          </Button>
        </Link>


        <div className="flex items-center justify-center">
          <div className="hidden md:block  glow absolute bottom-64 -z-10 aspect-square  w-full h-full max-h-64 max-w-4xl rounded-full bg-blue-400/15 dark:bg-[#737373] opacity-10  blur-3xl filter" />
          <HeroImage />
        </div>

        <div className="items-center mt-8 md:mt-0 justify-center">
          
          <img
          className="md:hidden block  z-10 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]"
          src="/dark-hero.png"
          alt="Hero image"
        />
        
        </div>
        <div className="flex justify-center mt-20 w-96 mx-auto">
     
     
     
    </div>
        
        <LogoTicker />
        <BentoComp/>
        <div className="mt-28  max-w-[1000px] mx-auto">
          <HeroTitle >
          Trusted by the best
          </HeroTitle>
          <div className="py-6">

          <AvatarCirclesUrl/>
          </div>

        <MarqueeComp/>
        </div>
       <TextRevealComp/>

       

        
        <Faq/>

       


        


      </Hero>
      
      
    </Container>
  );
};

export default HomePage;
