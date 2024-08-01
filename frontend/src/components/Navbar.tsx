import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "./icons/Logo";
import useTokenStore from "@/store";

const Navbar = () => {
  const token = useTokenStore((state) => state.token);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="fixed top-0 z-10 w-full backdrop-blur-[12px]">
      <div className="flex justify-between items-center p-3 md:px-4 lg:px-28">
        <Link
          to="/"
          className="flex items-center font-semibold lg:text-2xl md:text-lg"
        >
          <Logo />
        </Link>

        <div className="md:hidden flex gap-2">
          {!token ? (
            <div className="flex justify-center">
              <Link to="/auth/login">
                <Button
                  variant="link"
                  size="default"
                  onClick={toggleMenu}
                >
                  Login
                </Button>
              </Link>
              <Link to="/auth/register" className="ml-2">
                <Button
                  size="default"
                  className="md:text-sm text-[13px]"
                  onClick={toggleMenu}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link to="/auth/login">
                <Button
                  size="default"
                  className="md:text-sm text-[10px]"
                  onClick={toggleMenu}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
          <button
            onClick={toggleMenu}
            className="block text-gray-500  focus:outline-none"
          >
            <svg
              className="h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {showMenu ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 7H5v2h14V7zM5 11h14v2H5v-2zm14 4H5v2h14v-2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu items (collapsed menu for mobile) */}
        <div
          className={`md:hidden ${showMenu ? "block" : "hidden"
            } absolute top-16 left-0 w-full h-screen shadow-lg rounded-lg py-2 bg-white`}
        >
          <div className="flex flex-col gap-3">
            <Link
              to="/about"
              onClick={toggleMenu}
              className="py-1 px-4 underline"
            >
              About
            </Link>
            <Link
              to="/features"
              onClick={toggleMenu}
              className="py-1 px-4 underline"
            >
              Features
            </Link>
            <Link
              to="/"
              onClick={toggleMenu}
              className="py-1 px-4 hover:text-gray-200 underline"
            >
              Blog
            </Link>
            <Link
              to="/pricing"
              onClick={toggleMenu}
              className="py-1 px-4 hover:text-gray-200 underline"
            >
              Pricing
            </Link>
          </div>

          {/* Authentication buttons */}
        </div>

        {/* Menu items (left side for larger screens) */}
        <div className="md:flex md:gap-8 lg:gap-10 hidden">
          <Link className="hover:underline" to="/about">
            About
          </Link>
          <Link className="hover:underline" to="/features">
            Features
          </Link>
          <Link className="hover:underline" to="/">
            Blog
          </Link>
          <Link className="hover:underline" to="/pricing">
            Pricing
          </Link>
        </div>

        {/* Authentication buttons (right side for larger screens) */}
        <div className="gap-2 md:flex hidden">
          {!token ? (
            <>
              <Link to="/auth/login">
                <Button
                  variant="link"
                  size="sm"
                  className="md:text-sm text-[13px]"
                >
                  Login
                </Button>
              </Link>

              <Link to="/auth/register">
                <Button className="md:text-sm text-[13px]" size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/auth/login">
              <Button size="sm" className="md:text-sm text-[13px]">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
