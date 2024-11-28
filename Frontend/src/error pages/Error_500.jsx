import React from 'react'
import { BiSolidError } from "react-icons/bi";

const Error_500 = () => {
  return (
    <section className='flex gap-y-1 md:gap-y-4 h-[600px] justify-center items-center flex-col'>
        <div className='flex flex-row-reverse font-playfair gap-4 md:gap-6 items-center text-6xl md:text-8xl font-bold text-slate-600'>
            <h1 className=''>Error 500</h1>
            <BiSolidError />
        </div>
        <h3 className='text-4xl md:text-6xl font-bold font-playfair text-slate-500'>Internal Server Error</h3>
    </section>
  )
}

export default Error_500