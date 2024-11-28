import React, { useEffect, useState } from 'react'
import axios from '../utils/Axios'

const Dashboard = ({setcurrentRole}) => {

  //for logout function
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

  //for count
  const [admins,setadmins] = useState(0)
  const [students,setstudents] = useState(0)
  const [books,setbooks] = useState(0)

  async function countForDashboard() {
    try{
      const response = await axios.get('/dashboard/count')
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      else{
        setadmins(response.data.adminCount)
        setstudents(response.data.studentCount)
        setbooks(response.data.bookCount)
      }
    }
    catch(err){
      console.log(`Error in Count For Dashboard - ${err}`)
    }
  }

  useEffect(() =>{
    countForDashboard()
  },[])

  return (
    <section className='bg-[#301934] flex flex-col justify-evenly items-center h-[90vh]'>
      <div className='bg-[rgba(255,255,255,0.7)] text-2xl font-playfair font-bold flex justify-center items-center flex-col gap-y-1 py-5 w-[250px] h-[140px] rounded-lg'>
        <h2>Total Admins</h2>
        <h2>{admins}</h2>
      </div>
      <div className='bg-[rgba(255,255,255,0.7)] text-2xl font-playfair font-bold flex justify-center items-center flex-col gap-y-1 py-5 w-[250px] h-[140px] rounded-lg'>
        <h2>Total Students</h2>
        <h2>{students}</h2>
      </div>
      <div className='bg-[rgba(255,255,255,0.7)] text-2xl font-playfair font-bold flex justify-center items-center flex-col gap-y-1 py-5 w-[250px] h-[140px] rounded-lg'>
        <h2>Total Books</h2>
        <h2>{books}</h2>
      </div>
    </section>
  )
}

export default Dashboard