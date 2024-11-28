import React, { useState } from 'react'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = ({ setcurrentRole }) => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [role, setrole] = useState("student")
  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()
    try{
      const response = await axios.post(`/auth/admin/login`, {username: username, password: password, role: role}, {withCredentials: true})
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
      if(response.data.message == "Password is wrong"){
        toast.warn('Password Incorrect!', {
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
      if(response.data.message == "Admin not Registered"){
        toast.warn('Admin Not Registeres!', {
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
      if(response.data.message == "Student not Registered"){
        toast.warn('Student not Registered!', {
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
      if(response.data.login && response.data.role == 'admin'){
        setcurrentRole('admin')
        setusername('')
        setrole('')
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
      if(response.data.login && response.data.role == 'student'){
        setusername('')
        setcurrentRole('student')
        setrole('')
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
      console.log(`Error in Handle Submit - ${err}`)
    }
  }

  return (
    <section className='bg-[#301934] h-[91vh] flex justify-center items-center'>
      <div className='bg-[rgba(255,255,255,0.7)] flex flex-col gap-y-4 rounded-lg p-5 mx-10 w-[350px]'>
        <h1 className='text-3xl font-bold font-playfair text-center'>Login</h1>
        <form className='flex flex-col gap-y-3'>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="name">Username:</label>
            <input value={username} onChange={(event) =>setusername(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="text" id='name' name='name' placeholder='Enter Username' />
          </div>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="password">Password:</label>
            <input value={password} onChange={(event) =>setpassword(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="password" id='password' name='password' placeholder='Enter Password' />
          </div>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="role">Role:</label>
            <select value={role} onChange={(event) =>setrole(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' id='role' name='role'>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button onClick={() =>handleLogin(event)} className='mt-2 bg-green-700 hover:bg-green-500 duration-200 text-white py-1 text-lg rounded font-medium'>Login</button>
        </form>
      </div>
    </section>
  )
}

export default Login