import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="lg:max-w-[1200px] py-10 h-[10rem] sm:max-w-[920px] mx-auto px-16">
      <div className="text-xs opacity-60 px-4 md:px-0 md:text-lg">
        viralxpost is Built by{" "}
        <Link
          to="https://x.com/Avhi_Maz"
          target="_"
          className="underline font-medium"
        >
          Avhi
        </Link>{" "}
        and{" "}
        <Link
          to="https://x.com/near0lx"
          target="_"
          className="underline font-medium"
        >
          Pawan
        </Link>
        . hosted on{" "}
        <Link
          to="https://vercel.com/"
          target="_"
          className="underline font-medium"
        >
          Vercel
        </Link>
        . the source code is available on{" "}
        <Link
          to="https://github.com/viralxpost/viralxpost-web"
          target="_"
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
