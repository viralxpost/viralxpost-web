import {
    CircleUser,
    Feather,
    Lightbulb,
    LineChart,
    Menu,
    Search,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, NavLink, Outlet } from "react-router-dom"
import Logo from "@/components/icons/Logo"
import { TwitterLogoIcon } from "@radix-ui/react-icons"

const DashBoardLayout = () => {
  return (
   
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-20 items-center px-4 lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Logo width="30"/>
            </Link>
            
          </div>
          <div className="flex-1">
            <nav className="grid mt-6 gap-2 items-start px-4 text-sm font-medium">
             
              <NavLink
                to="/dashboard"
                className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && 'bg-muted'
                    }`;
                }}
              >
                <TwitterLogoIcon className="h-4 w-4" />
                Tweet generate
              </NavLink>
              <NavLink
                to="/dashboard/thread"
                className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && 'bg-muted'
                    }`;
                }}
              >
                <Feather className="h-4 w-4" />
                Threads generate{" "}
              </NavLink>
              <NavLink
                to="/dashboard/ideas"
                className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && 'bg-muted'
                    }`;
                }}
              >
                <Lightbulb className="h-4 w-4" />
                Idea generate
              </NavLink>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && 'bg-muted'
                    }`;
                }}
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      

      {/* mobile */}
      <div className="flex flex-col">
        <header className="flex h-20 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
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
                <Logo width="30" className="mb-10"/>
              <nav className="grid gap-2 font-medium">
              
              <NavLink
                to="/dashboard"
                className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && 'bg-muted'
                    }`;
                }}
              >
                <TwitterLogoIcon className="h-4 w-4" />
                Tweet generate
               
              </NavLink>
              <NavLink
                to="/dashboard/thread"
                className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && 'bg-muted'
                    }`;
                }}
              >
                <Feather className="h-4 w-4" />
                Thread generate{" "}
              </NavLink>
              <NavLink
                to="/dashboard/ideas"
                className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && 'bg-muted'
                    }`;
                }}
              >
                <Lightbulb className="h-4 w-4" />
                Idea generate
              </NavLink>
              <NavLink
                to="/dashboard/calender"
                className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && 'bg-muted'
                    }`;
                }}
              ><LineChart className="h-4 w-4" />
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
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
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
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default DashBoardLayout