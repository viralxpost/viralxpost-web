import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "./icons/Logo";
import useTokenStore from "@/store";

const Navbar = () => {
  const token = useTokenStore((state) => state.token)

  return (
    <nav className="fixed top-0 z-10 w-full backdrop-blur-[12px]">
      <div className="flex justify-between items-center p-3 md:px-4 lg:px-28">
        <Link
          to="/"
          className="flex items-center  font-semibold lg:text-2xl md:text-lg"
        >
          <Logo />
          viralxpost
        </Link>
        <div className="md:flex text-sm lg:text-base md:gap-8 lg:gap-10 hidden">
          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        <div className="flex gap-2">
        {
          !token ? (
            <>
            <Link to="/auth/login">
            <Button variant="link" size="sm" className="md:text-sm text-[13px]">
              Login
            </Button>
          </Link>

          <Link to="/auth/register">
            <Button className="md:text-sm text-[13px]" size="sm">
              Sign up
            </Button>
          </Link>
            </>
          ) : 
              (<Link to="/auth/login">
            <Button size="sm" className="md:text-sm text-[13px]">
              Get Started
            </Button>
          </Link>)
          
        }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
