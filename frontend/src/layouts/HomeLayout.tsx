
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'


import {Outlet} from 'react-router-dom'


const HomeLayout = () => {

  return (
    // bg-page-gradient
    <main className=''>
     
    <Navbar/>
     <Outlet/> 
     <Footer/>
    </main>
  )
}

export default HomeLayout