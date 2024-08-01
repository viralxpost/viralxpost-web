import { Button } from "@/components/ui/button";
import config from "@/config/config";
import useTokenStore from "@/store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export function LoginPage() {
  const navigate = useNavigate();

  const setToken = useTokenStore((state) => state.setToken);

  // const emailRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);

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
  //mutation
  // const mutation = useMutation({
  //   mutationFn: login,
  //   onSuccess: (response) => {
  //     setToken(response.accessToken);
  //     if (config.isDevelopment) {
  //       console.log("Login successful", response.accessToken);
  //     }
  //     navigate("/dashboard");
  //   },
  //   onError: (error) => {
  //     if (config.isDevelopment) {
  //       console.log("Error:", error);
  //     }
  //   },
  // });

  // const handleLoginSubmit = () => {
  //   const email = emailRef.current?.value;
  //   const password = passwordRef.current?.value;

  //   //make server call
  //   if (!email || !password) {
  //     return alert("Please enter email and password");
  //   }

  //   mutation.mutate({ email, password });
  // };

  const handleGoogleLogin = () => {
    window.location.href = `${config.backendBaseUrl}auth/google`;
  };

  return (
    <div className="w-full mx-auto  xl:min-h-[800px]">
      <div className="flex items-center md:mt-40 px-12 rounded-md  justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <div className="grid gap-4">
            
            <Button
              variant="outline"
              className="w-full flex gap-1 items-center justify-center"
              onClick={handleGoogleLogin}
            >
              <FaGoogle />
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
