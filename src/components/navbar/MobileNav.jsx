import React, { useEffect } from "react";
import "./Header.css";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const MobileNav = ( {setNavMobile }) => {

   const { path } = useLocation()
  useEffect(() => {
    setNavMobile(false)
  }, [path])

  return (
    <nav className='lg:hidden bg-black text-gray-300 w-full h-full'>
      
      <IoClose onClick={()=> setNavMobile(false)} className='text-3xl absolute right-6 top-6 cursor-pointer ' />

      <ul className='flex flex-col justify-center space-y-8 h-full items-center capitalize font-secondary'>
          <Link onClick={() => setNavMobile(false)}  to="/">
          <li className="text-md">home</li>
        </Link>
           <Link onClick={() => setNavMobile(false)}  to="/">
          <li className="text-md">home</li>
        </Link>
          <li className='text-2xl'>home</li>
          <li className='text-2xl'>home</li>
        </ul> 


    </nav>
  )
}

export default MobileNav