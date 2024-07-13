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
    <h1 className={cn(`md:text-4xl lg:text-6xl font-semibold bg-gradient-to-r from-white to-[#999999] inline-block text-transparent bg-clip-text text-lg my-4 ${className}`)}>{children}</h1>
    </>
    )
}

export const HeroSubtitle = ({children, className}: HeroElementProps) => {
    return (
        <p className={cn('md:text-lg text-[10px] mb-6 opacity-70', className)}>{children}</p>
    )
}

export const Hero = ({ children }: HeroProps) => {
    return (
        <div className='text-center'>
            {children}
        </div>
    )
}
