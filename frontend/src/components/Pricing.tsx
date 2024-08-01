import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Sign up for Free",
    popular: false,
    inverse: false,
    features: [
      "Unlimited features",
      "No hidden costs",
      "No credit card required",
      "No support or assistance",
      "No API access",
      "No Advance information",
    ],
  },
  {
    title: "Basic",
    monthlyPrice: 9,
    buttonText: "Start your free trial",
    popular: true,
    inverse: true,
    features: [
      "Unlimited features",
      "No hidden costs",
      "No credit card required",
      "No support or assistance",
      "No API access",
      "No Advance information",
      "No support or assistance",
      "No API access",
    ],
  },
  {
    title: "Basic",
    monthlyPrice: 19,
    buttonText: "Start your free trial",
    popular: false,
    inverse: false,
    features: [
      "Unlimited features",
      "No hidden costs",
      "No credit card required",
      "No support or assistance",
      "No API access",
      "No Advance information",
      "No support or assistance",
      "No API access",
      "No Advance information",
      "No support or assistance",
    ],
  },
];

interface Options {
  title: string;
  monthlyPrice: number;
  buttonText: string;
  popular: boolean;
  inverse: boolean;
  features: string[];
}

const Pricing = () => {
  return (
    <section className="py-24">
      <div className="px-5 md:px-0 md:max-w-[900px] lg:max-w-[1300px] container mx-auto">
        <div className="section-container">
          <h2 className="section-title">Pricing</h2>
          <p className="section-description mt-5">
            Choose a plan that fits your budget and business goals perfectly.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            ({
              title,
              monthlyPrice,
              buttonText,
              popular,
              inverse,
              features,
            }: Options) => (
              <div
                key={title}
                className={twMerge(
                  "card",
                  inverse && "border-black bg-black text-white"
                )}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "text-lg font-bold text-black/50",
                      inverse && "text-white/60"
                    )}
                  >
                    {title}
                  </h3>
                  {popular && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                      <motion.span
                        animate={{
                          backgroundPositionX: "100%",
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                          repeatType: "loop",
                        }}
                        className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                      >
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>
                  <span
                    className={twMerge(
                      "tracking-tight font-bold text-black/50",
                      inverse && "text-white/50"
                    )}
                  >
                    /month
                  </span>
                </div>
                <button
                  className={twMerge(
                    "btn btn-primary w-full mt-[30px]",
                    inverse && "bg-white text-black"
                  )}
                >
                  {buttonText}
                </button>
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature, index) => (
                    <li className="text-sm flex items-center gap-4" key={index}>
                      <Check className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
