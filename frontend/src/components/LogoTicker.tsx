import acmeLogo from '@/assets/logo-acme.png'
import quantumLogo from '@/assets/logo-quantum.png'
import echoLogo from '@/assets/logo-echo.png'
import celestialLogo from '@/assets/logo-celestial.png'
import pulseLogo from '@/assets/logo-pulse.png'
import { motion } from 'framer-motion'

const LogoTicker = () => {
  return (
    <div className='my-10 bg-white'>
      <div className='px-5 md:px-10 md:flex items-center justify-center'>
        <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
          <motion.div className='flex gap-14 flex-none pr-14' animate={{
            translateX: '-50%',
          }}
          transition={{
            duration: 20, 
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          >
            <img src={acmeLogo} alt="Acme Logo" className='logo-ticker-img' />
            <img src={quantumLogo} alt="Quantum Logo" className='logo-ticker-img' />
            <img src={echoLogo} alt="Echo Logo" className='logo-ticker-img' />
            <img src={celestialLogo} alt="Celestial Logo" className='logo-ticker-img' />
            <img src={pulseLogo} alt="Pulse Logo" className='logo-ticker-img' />
            <img src={acmeLogo} alt="Acme Logo" className='logo-ticker-img' />
            <img src={quantumLogo} alt="Quantum Logo" className='logo-ticker-img' />
            <img src={echoLogo} alt="Echo Logo" className='logo-ticker-img' />
            <img src={celestialLogo} alt="Celestial Logo" className='logo-ticker-img' />
            <img src={pulseLogo} alt="Pulse Logo" className='logo-ticker-img' />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LogoTicker
