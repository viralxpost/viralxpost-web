

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/http/api"
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"
import { Link } from "react-router-dom"

export function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  //mutation
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {

    }
  })


  
  const handleLoginSubmit = () => {
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    //make server call
    if(!email || !password) {
      return alert("Please enter email and password")
    }
    
    mutation.mutate({ email, password })
  }

  return (
    <div className="flex items-center  justify-center ">
      <div className="flex items-center mt-40 border border-[#ffffff1f] px-12 rounded-md  justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account
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
            <Button onClick={handleLoginSubmit} type="submit" className="w-full">
              Login
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
  )
}
