import React, { useState, useEffect } from 'react'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddStudent = ({setcurrentRole}) => {

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

    //Add student
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [rollno, setrollno] = useState("")
    const [grade, setgrade] = useState("")
    const navigate = useNavigate()

    async function handleAddStudent(event) {
        event.preventDefault()
        try{
            const response = await axios.post('/auth/student/login', {rollno: rollno, username: username, grade: grade, password: password}, {withCredentials: true})
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(response.data.message == "Details Missing"){
                toast.warn('Details Missing!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
              }
              if(response.data.message == "Student Already Registered"){
                toast.warn('Already Registered!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
              }
              if(response.data.message == "Token Missing" || response.data.message == "Invalid Token"){
                toast.warn('Your not authorized to add!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
              }
              if(response.data.login && response.data.role == 'student'){
                setrollno('')
                setusername('')
                setgrade('')
                setpassword('')
                navigate('/')
                toast.success('Login Successful!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
              }
        }
        catch(err){
            console.log(`Error in Add Student - ${err}`)
        }
    }

  return (
    <section className='bg-[#301934] h-[91vh] flex justify-center items-center'>
      <div className='bg-[rgba(255,255,255,0.7)] flex flex-col gap-y-4 rounded-lg p-5 mx-10 w-[350px]'>
        <h1 className='text-3xl font-bold font-playfair text-center'>Add Student</h1>
        <form className='flex flex-col gap-y-3'>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="rollno">Roll No:</label>
            <input value={rollno} onChange={(event) =>setrollno(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="text" id='rollno' name='rollno' placeholder='Enter Roll No' />
          </div>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="username">Username:</label>
            <input value={username} onChange={(event) =>setusername(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="text" id='username' name='username' placeholder='Enter Username' />
          </div>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="grade">Grade:</label>
            <input value={grade} onChange={(event) =>setgrade(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="text" id='grade' name='grade' placeholder='Enter Grade' />
          </div>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="password">Password:</label>
            <input value={password} onChange={(event) =>setpassword(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="password" id='password' name='password' placeholder='Enter Password' />
          </div>
          <button onClick={() =>handleAddStudent(event)} className='mt-2 bg-green-700 hover:bg-green-500 duration-200 text-white py-1 text-lg rounded font-medium'>Register</button>
        </form>
      </div>
    </section>
  )
}

export default AddStudent