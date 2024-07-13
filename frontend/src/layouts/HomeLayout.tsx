
import Navbar from '@/components/Navbar'


import {Outlet} from 'react-router-dom'


const HomeLayout = () => {

  return (
    <main className='bg-page-gradient'>
      <div className='relative'>
    <img src="/mesh.png" className='absolute opacity-20 w-full h-screen' alt="" />
      </div>
    <Navbar/>
     <Outlet/> 
    </main>
  )
}

export default HomeLayout