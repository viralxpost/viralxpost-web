import { cn } from "@/lib/utils";
interface HeroProps {
  children: React.ReactNode;
}

interface HeroElementProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroTitle = ({ children, className }: HeroElementProps) => {
    return (
    <>
    <h1 className={cn(`md:text-5xl lg:text-6xl font-semibold section-title mt-5 ${className}`)}>{children}</h1>
    </>
    )
}

export const HeroSubtitle = ({children, className}: HeroElementProps) => {
    return (
        <p className={cn('md:text-lg mb-6 opacity-40 section-description mt-5', className)}>{children}</p>
    )
}

export const Hero = ({ children }: HeroProps) => {
    return (
        <div className='text-center'>
            {children}
        </div>
    )
}
