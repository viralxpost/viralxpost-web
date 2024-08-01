import { MagicWandIcon } from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "./magicui/bento-grid";
import { Clock, GlobeIcon, Palette, TrendingUp } from "lucide-react";



const BentoComp = () => {
  const features = [
    {
      Icon: MagicWandIcon,
      name: "Generate human-quality tweets and threads",
      description: "Our AI crafts tweets and threads that sound like they were written by a real person. No more robotic or impersonal content.",
      href: "/",
      cta: "Learn more",
      background: "",
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: Palette,
      name: "Choose from Various Tones and Styles",
      description: "Tailor your content to match your brand's personality. From witty and humorous to informative and professional, we've got you covered.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: "Customize Content to Match Your Brand",
      description: "Align your tweets and threads with your brand identity. Our tool helps you maintain consistency and authenticity.",
      href: "/",
      cta: "Learn more",
      background: "",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: Clock,
      name: "Save Time and Increase Engagement",
      description: "Spend less time crafting content and more time engaging with your audience. Our AI-powered tool streamlines the content creation process.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: TrendingUp,
      name: "Optimize for Maximum Reach",
      description:
        "Increase your tweet's visibility with our AI-driven optimization tools",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];
  return (
    <div className="mt-28  max-w-[1000px] mx-auto">
      <div className="flex justify-center">
        <div className="tag">Features</div>
      </div>
      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:300ms] section-title mt-5">
        Key Features
      </div>
      <div className="section-description mt-5">
        Explore the Core Features of Our Tool!
      </div>

      <BentoGrid className="lg:grid-rows-3 mt-10">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  )
}

export default BentoComp