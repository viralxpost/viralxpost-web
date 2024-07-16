import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import config from "@/config/config";
import { login } from "@/http/api";
import { cn } from "@/lib/utils";
import useTokenStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const setToken = useTokenStore((state) => state.setToken);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //mutation
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (config.isDevelopment) {
        console.log("Login successful");
      }
      setToken(response.accessToken);
      navigate("/dashboard");
    },
    onError: (error) => {
      if (config.isDevelopment) {
        console.log("Error:", error);
      }
    },
  });

  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //make server call
    if (!email || !password) {
      return alert("Please enter email and password");
    }

    mutation.mutate({ email, password });
  };

  return (
    <div className="w-full mx-auto  xl:min-h-[800px]">
      <div className="flex items-center md:mt-40 px-12 rounded-md  justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account'
              <br />
              {mutation.isError && (
                <span className="text-red-500 text-sm">
                  {mutation.error?.message || "An error occurred"}
                </span>
              )}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input ref={passwordRef} id="password" type="password" required />
            </div>
            <Button
              onClick={handleLoginSubmit}
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              <Loader
                className={cn(mutation.isPending ? "animate-spin" : "hidden")}
              />
              <span className={cn(mutation.isPending ? "hidden" : "block")}>
                Login
              </span>
            </Button>
            <Button variant="outline" className="w-full">
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
