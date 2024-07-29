import React, { useState } from "react";
import config from "@/config/config";
import { createOrder, verifyPayment } from "@/http/api";

const PricingCard: React.FC<{
  plan: string;
  amount: number;
  description: string;
  onSelect: (plan: string) => void;
  selectedPlan: string | null;
}> = ({ plan, amount, description, onSelect, selectedPlan }) => (
  <div
    className={`p-4 bg-white border border-gray-200 rounded-lg shadow ${
      selectedPlan === plan ? "bg-blue-100" : ""
    } cursor-pointer`}
    onClick={() => onSelect(plan)}
  >
    <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
      {description}
    </h5>
    <div className="flex items-baseline text-gray-900 dark:text-white">
      <span className="text-3xl font-semibold">₹</span>
      <span className="text-5xl font-extrabold tracking-tight">{amount}</span>
      <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
      </span>
    </div>
    <ul role="list" className="space-y-5 my-7">
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          Feature 1
        </span>
      </li>
      <li className="flex">
        <svg
          className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          Feature 2
        </span>
      </li>
      {/* Add more features as needed */}
    </ul>
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
    >
      Choose Plan
    </button>
  </div>
);

const PaymentButton: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!selectedPlan) {
      alert("Please select a plan.");
      return;
    }

    try {
      // Call createOrder with the selected plan
      const order = await createOrder(selectedPlan);
      const { id: orderId, amount } = order;

      // Set up Razorpay options
      const options = {
        key: config.razorPay,
        amount, // Amount in the smallest currency unit
        currency: "INR",
        name: "viralxpost",
        description: "Test Transaction",
        order_id: orderId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
          try {
            // Verify payment
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

      // Open Razorpay checkout
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Payment initialization failed.");
    }
  };

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
      <PricingCard
        plan="3_months"
        amount={500}
        description="3 Months Plan"
        onSelect={setSelectedPlan}
        selectedPlan={selectedPlan}
      />
      <PricingCard
        plan="6_months"
        amount={1000}
        description="6 Months Plan"
        onSelect={setSelectedPlan}
        selectedPlan={selectedPlan}
      />
      <PricingCard
        plan="12_months"
        amount={1500}
        description="12 Months Plan"
        onSelect={setSelectedPlan}
        selectedPlan={selectedPlan}
      />
      <div className="flex items-center justify-center mt-10 md:col-span-3">
        <button
          onClick={handlePayment}
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentButton;
