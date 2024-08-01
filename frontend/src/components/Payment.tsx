import config from "@/config/config";
import { createOrder, verifyPayment } from "@/http/api";
import useTokenStore from "@/store";
import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    title: "Premium",
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

const Payment = () => {
  const token = useTokenStore((state) => state.token);
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleNavigate = () => {
    navigate("/auth/login");
  };

  const handlePayment = async (title: string, monthlyPrice: number) => {
    const planMap: { [key: string]: string } = {
      Free: "free",
      Basic: "9_dollars",
      Premium: "19_dollars",
    };

    const plan = planMap[title];

    if (!token) {
      if (plan === "free") {
        handleNavigate();
        return;
      }
      alert("You need to be logged in to make a payment.");
      handleNavigate();
      return;
    }

    if (plan === "free") {
      navigate("/dashboard");
      return;
    }

    try {
      const order = await createOrder(plan);
      const { id: orderId, amount } = order;

      const options = {
        key: config.razorPay,
        amount,
        currency: "USD",
        name: "viralxpost",
        description: `${plan} Plan - ${monthlyPrice} USD/month`,
        order_id: orderId,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
          try {
            await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            alert("Payment successful!");
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test.user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Payment initialization failed");
    }
  };

  return (
    <section className="">
      <div className="px-5 md:px-0 md:max-w-[900px] lg:max-w-[1300px] container mx-auto">
        <div className="section-container mt-5">
          <h2 className="section-title p-2">Pricing</h2>
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
                  inverse && "border-black bg-black text-white",
                  selectedPlan === title && "ring-2 ring-blue-500"
                )}
                onClick={() => setSelectedPlan(title)}
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
                  onClick={() => handlePayment(title, monthlyPrice)}
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

export default Payment;
