import {
  CircleUser,
  Cuboid,
  Feather,
  GalleryHorizontalEnd,
  GalleryVertical,
  Lightbulb,
  LineChart,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import Logo from "@/components/icons/Logo";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import useTokenStore from "@/store";
import { useEffect } from "react";
import { logout } from "@/http/api";
import config from "@/config/config";

const DashBoardLayout = () => {
  const token = useTokenStore((state) => state.token);
  const removeToken = useTokenStore((state) => state.removeToken);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      removeToken();
      navigate("/auth/login");
      if (config.isDevelopment) {
        console.log("User logged out successfully");
      }
    } catch (error) {
      if (config.isDevelopment) {
        console.error("Failed to logout:", error);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-20 items-center px-4 lg:px-6">
            <Link to="/" className="flex fixed items-center gap-2 font-semibold">
              <Logo width="30" />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid fixed mt-6 gap-2 items-start px-4 text-sm font-medium">
              <NavLink
                to="/dashboard/tweet"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted"
                  }`;
                }}
              >
                <TwitterLogoIcon className="h-4 w-4" />
                Tweet generate
              </NavLink>
              <NavLink
                to="/dashboard/all-tweets"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted"
                  }`;
                }}
              >
                <GalleryVertical className="h-4 w-4" />
                All Tweets
              </NavLink>
              <NavLink
                to="/dashboard/thread"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted"
                  }`;
                }}
              >
                <Feather className="h-4 w-4" />
                Threads generate{" "}
              </NavLink>
              <NavLink
                to="/dashboard/all-threads"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted"
                  }`;
                }}
              >
                <GalleryHorizontalEnd className="h-4 w-4" />
                All Thread
              </NavLink>
              <NavLink
                to="/dashboard/idea"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted"
                  }`;
                }}
              >
                <Lightbulb className="h-4 w-4" />
                Idea generate
              </NavLink>

              <NavLink
                to="/dashboard/all-ideas"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted"
                  }`;
                }}
              >
                <Cuboid className="h-4 w-4" />
                All Ideas
              </NavLink>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted"
                  }`;
                }}
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4 fixed bottom-0  w-[13.5rem] lg:w-[17.5rem] mx-auto">
            <Card x-chunk="dashboard-02-chunk-0 ">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Link to="/pricing">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex flex-col">
        <header className="flex h-20 w-full mx-auto items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Logo width="30" className="mb-10" />
              <nav className="grid gap-2 font-medium fox">
                <NavLink
                  to="/dashboard/tweet"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted"
                    }`;
                  }}
                >
                  <TwitterLogoIcon className="h-4 w-4" />
                  Tweet generate
                </NavLink>
                <NavLink
                  to="/dashboard/all-tweets"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted"
                    }`;
                  }}
                >
                  <GalleryVertical className="h-4 w-4" />
                  All Tweets
                </NavLink>
                <NavLink
                  to="/dashboard/thread"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted"
                    }`;
                  }}
                >
                  <Feather className="h-4 w-4" />
                  Thread generate{" "}
                </NavLink>
                <NavLink
                  to="/dashboard/all-threads"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted"
                    }`;
                  }}
                >
                  <GalleryHorizontalEnd className="h-4 w-4" />
                  All Threads
                </NavLink>

                <NavLink
                  to="/dashboard/idea"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted"
                    }`;
                  }}
                >
                  <Lightbulb className="h-4 w-4" />
                  Idea generate
                </NavLink>
                <NavLink
                  to="/dashboard/all-ideas"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted"
                    }`;
                  }}
                >
                  <Cuboid className="h-4 w-4" />
                  Ideas
                </NavLink>
                <NavLink
                  to="/dashboard/analytics"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted"
                    }`;
                  }}
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </NavLink>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/pricing">
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
         
         <div className="flex w-full justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
         </div>

        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
