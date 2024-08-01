import { Button } from "@/components/ui/button";
import config from "@/config/config";
import useTokenStore from "@/store";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const setToken = useTokenStore((state) => state.setToken);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token);
      if (config.isDevelopment) {
        console.log("Login successful");
        console.log("Redirecting to dashboard with token", token);
      }
      navigate("/dashboard");
    }
  }, [navigate, setToken]);



  const handleGoogleSignUp = () => {
    window.location.href = `${config.backendBaseUrl}auth/google`;
  };

  return (
    <div className="w-full xl:min-h-[800px]">
      <div className="flex md:mt-40 items-center  px-12 rounded-md  justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
          </div>
          <div className="grid gap-4">
      
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignUp}
            >
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
