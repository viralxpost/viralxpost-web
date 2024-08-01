import { Button } from "@/components/ui/button";
import config from "@/config/config";
import useTokenStore from "@/store";
import { ArrowLeft } from "lucide-react";

import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
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
    <div className="w-full xl:min-h-[800px my-20]">
      <div className="flex mt-40 items-center sm:py-28 px-12 rounded-md  justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
          </div>
          <div className="grid gap-4">
      
            <Button
              variant="outline"
              className="w-full flex gap-2"
              onClick={handleGoogleSignUp}
            >
              <FaGoogle />
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
          <Link to='/' className=" text-sm text-center flex items-center justify-center gap-2 underline">
            <ArrowLeft className="w-4"/>
            back to home
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
