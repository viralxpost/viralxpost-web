import React from 'react'

interface HeroProps {
    children: React.ReactNode;
}

interface HeroElementProps {
    children: React.ReactNode;
}

export const HeroTitle = ({ children }: HeroElementProps) => {
    return (
    <>
    <h1 className='lg:text-6xl md:text-5xl font-semibold bg-gradient-to-r from-white to-[#999999] inline-block text-transparent bg-clip-text text-4xl my-6'>{children}</h1>
    </>
    )
}

export const HeroSubtitle = ({children}: HeroElementProps) => {
    return (
        <p className='text-lg mb-12 opacity-70'>{children}</p>
    )
}

export const Hero = ({ children }: HeroProps) => {
    return (
        <div className='text-center'>
            {children}
        </div>
    )
}
