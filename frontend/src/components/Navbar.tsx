import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import Logo from "./icons/Logo"



const Navbar = () => {
    return (
        <nav className="fixed top-0 z-10 w-full backdrop-blur-[12px]">
            
            <div className="flex justify-between items-center p-3 md:px-4 lg:px-28">   
                <Link to="/"  className="flex items-center  font-semibold lg:text-2xl md:text-lg">
                <Logo/>
                    viralxpost
                </Link>
                <div className="md:flex text-sm lg:text-base md:gap-8 lg:gap-10 hidden">
                    <Link to="#">
                        About
                    </Link>
                    <Link to="#">
                        Features
                    </Link>
                    <Link to="#">
                        Blog
                    </Link>
                    <Link to="#">
                        Pricing
                    </Link>

                </div>
                
                <div className="flex gap-2">
                    <Link to="/auth/login" >
                        <Button variant="link" size="sm" className="md:text-sm text-[13px]" >
                            Login
                        </Button>

                    </Link>

                    <Link to="/auth/register">

                        <Button className="md:text-sm text-[13px]" size="sm">
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default Navbar