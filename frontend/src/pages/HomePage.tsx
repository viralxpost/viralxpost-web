import { AvatarCirclesUrl } from "@/components/Avatarurl";
import BentoComp from "@/components/BentoComp";
import Container from "@/components/Container";
import Faq from "@/components/Faq";
import { HeroImage } from "@/components/HeroImage";
import LogoTicker from "@/components/LogoTicker";
import { MarqueeComp } from "@/components/MarqueeComp";
import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <Container>
      <div className="z-10 translate-y-[-1rem] mt-10 animate-fade-in opacity-0 [--animation-delay:100ms] flex lg:min-h-[10rem] md:min-h-[7rem] min-h-[5rem] items-center justify-center">
        <div className="mt-28  max-w-[1000px] mx-auto">
          <div className="section-container">
          </div>
          <div className="flex justify-center">
            <div className="tag">Version 1.0 is here</div>
          </div>

          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] section-title mt-5">
            Start Generating Viral Tweets Today{" "}
            <br className="hidden md:inline-block " /> Let{" "}
            <Link to="/" className="underline">
              viralxpost
            </Link>{" "}
            Be Your Guide.
          </div>
          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] section-description mt-5">
            Let our AI tool help you create engaging content that breaks{" "}
            <br className="hidden md:block" /> through the noise and gets you seen
            by the right people.
          </div>
          <Link to="/auth/login" className="flex justify-center items-center">
            <Button className="translate-y-[-1rem] mt-5 animate-fade-in opacity-0 [--animation-delay:600ms]">
              Get Started For Free
            </Button>
          </Link>
        </div>
      </div>
      <div>

        <div className="flex items-center justify-center">
          <div className="hidden md:block  glow absolute bottom-64 -z-10 aspect-square  w-full h-full max-h-64 max-w-4xl rounded-full bg-blue-400/15 dark:bg-[#737373] opacity-10  blur-3xl filter" />
          <HeroImage />
        </div>

        <div className="items-center mt-8 md:mt-0 justify-center">
          <img
            className="md:hidden block  z-10 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]"
            src="/light3.png"
            alt="Hero image"
          />
        </div>
        <div className="mt-28  max-w-[1000px] mx-auto">

          <LogoTicker />

        </div>

        <BentoComp />
        <div className="mt-28  max-w-[1000px] mx-auto">
          <div className="section-container">

            <div className="flex justify-center">
              <div className="tag">Testimonials</div>
            </div>
            <h2 className="section-title mt-5">What our users say</h2>
            <p className="section-description mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi molestias ipsum commodi!
            </p>
          </div>
          <div className="py-6">
            <AvatarCirclesUrl />
          </div>

          <MarqueeComp />
        </div>
        <Pricing />

        <Faq />
      </div>
    </Container>
  );
};

export default HomePage;