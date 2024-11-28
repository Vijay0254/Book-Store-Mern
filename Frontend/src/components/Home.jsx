import React, { useEffect } from 'react'
import axios from '../utils/Axios'

const Home = ({setcurrentRole}) => {

  async function getrole() {
    const response = await axios.get('/auth/student/verify', {withCredentials: true})
    if(response.data.login){
      setcurrentRole(response.data.role)
    }
    else{
      setcurrentRole('')
    }
    
  }

  useEffect(() =>{
    getrole()
  }, [])

  return (
    <section className='flex font-playfair flex-col-reverse text-center md:text-start md:flex-row h-[92vh] bg-[#301934] text-[#ffc107] py-20 md:px-20 px-10 md:gap-10'>
      <div className='flex-1 flex flex-col justify-center'>
        <h1 className='text-6xl font-bold pb-2'>Book Shop</h1>
        <p className='md:text-xl text-lg'>Browse the Collection of our best top interesting Books you will definitely find what you are looking for.</p>
      </div>
      <div className='home-page flex-1'></div>
    </section>
  )
}

export default Home