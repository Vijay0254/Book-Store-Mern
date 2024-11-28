import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMiniBars3 } from "react-icons/hi2";

const Navbar = ({currentRole}) => {
  const [toggle,settoggle] = useState(false)

  return (
    <nav className='bg-[#301934] border-b-4 border-b-pink-900 py-4 text-white flex items-center justify-between px-4 md:px-10'>
        <Link to='/'>
            <span className='text-2xl md:text-4xl font-bold font-playfair'>Book Store</span>
        </Link>
        <div className='hidden md:flex gap-x-4 md:gap-x-7 font-playfair text-lg md:text-xl items-center font-semibold'>
            <Link to="/books" className='hover:text-orange-300 duration-200'>Books</Link>
            
            {
              currentRole == "admin" &&
                <>
                  <Link to="/addBook" className='hover:text-orange-300 duration-200'>Add Book</Link>
                  <Link to="/addStudent" className='hover:text-orange-300 duration-200'>Add Student</Link>
                  <Link to="/dashboard" className='hover:text-orange-300 duration-200'>Dashboard</Link>
                </>
            }
            {
              currentRole == "" ?
              <Link to="/login" className='hover:text-orange-300 duration-200'>Login</Link>
              :
              <Link to='/logout' className='hover:text-orange-300 duration-200'>Logout</Link>
            }
        </div>
        <span onClick={() =>settoggle(true)} className='md:hidden block text-2xl font-bold'><HiMiniBars3 /></span>
        {
          toggle && 
              <nav className='absolute right-5 top-20'>
                <div className='font-playfair bg-[rgba(255,255,255)] text-black rounded py-2 pb-5 px-5 flex w-[170px] flex-col gap-y-2 text-lg font-semibold'>
                  <span onClick={() =>settoggle(false)} className='text-end text-2xl font-sans font-bold'>x</span>
                  <Link to="/books" className='hover:text-orange-300 duration-200 border-b-2 border-[#301934]'>Books</Link>
                  
                  {
                    currentRole == "admin" &&
                      <>
                        <Link to="/addBook" className='hover:text-orange-300 duration-200 border-b-2 border-[#301934]'>Add Book</Link>
                        <Link to="/addStudent" className='hover:text-orange-300 duration-200 border-b-2 border-[#301934]'>Add Student</Link>
                        <Link to="/dashboard" className='hover:text-orange-300 duration-200 border-b-2 border-[#301934]'>Dashboard</Link>
                      </>
                  }
                  {
                    currentRole == "" ?
                    <Link to="/login" className='hover:text-orange-300 duration-200 border-b-2 border-[#301934]'>Login</Link>
                    :
                    <Link to='/logout' className='hover:text-orange-300 duration-200 border-b-2 border-[#301934]'>Logout</Link>
                  }
                </div>
              </nav>
        }
    </nav>
  )
}

export default Navbar