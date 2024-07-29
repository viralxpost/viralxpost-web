const config = {
  isDevelopment: import.meta.env.VITE_APP_ENV === "development",
  backendBaseUrl: import.meta.env.VITE_BACKEND_BASE_URL as string,
  razorPay: import.meta.env.VITE_RAZORPAY_KEY_ID
};

export default config;
