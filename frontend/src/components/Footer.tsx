import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="lg:max-w-[1300px] py-10 h-[10rem] sm:max-w-[920px] mx-auto lg:px-16">
      <div className="text-xs opacity-60 px-4 md:px-0 md:text-lg">
        viralxpost is Built by{" "}
        <Link to="https://x.com/Avhi_Maz" className="underline font-medium">
          Avhi
        </Link>{" "}
        and{" "}
        <Link to="https://x.com/near0lx" className="underline font-medium">
          Pawan
        </Link>
        . hosted on{" "}
        <Link to="https://vercel.com/" className="underline font-medium">
          Vercel
        </Link>
        . the source code is available on{" "}
        <Link
          to="https://github.com/viralxpost/viralxpost-web"
          className="underline font-medium"
        >
          GitHub
        </Link>
        .
      </div>
    </footer>
  );
};

export default Footer;
