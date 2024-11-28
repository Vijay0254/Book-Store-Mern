import React, { useEffect, useState } from 'react'
import axios from '../utils/Axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Books = ({currentRole,setcurrentRole}) => {

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

  //To get and display Books
  const [books,setbooks] = useState([])
  const navigate = useNavigate()

  async function getBooks() {
    try{
      const response = await axios.get('/book/get', {withCredentials: true})
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      else{
        setbooks(response.data)
      }
    }
    catch(err){
      console.log(`Error in Fetching and Displaying Books - ${err}`)
    }
  }

  useEffect(() =>{
    getBooks()
  },[])

  //to delete book
  async function handleDelete(event,id){
    event.preventDefault()
    try{
      const response = await axios.delete(`/book/delete/${id}`)
      if(response.data.message == "Internal Server Error"){
        navigate('/500')
      }
      if(response.data.message == "Deleted Successfully"){
        toast.success('Book Deleted Successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setTimeout(() =>{
            window.location.href = "/books"
          }, 3000)
      }
    }
    catch(err){
      console.log(`Error in Handle Delete - ${err}`)
    }
  }

  return (
    <div className='flex justify-center pt-16 gap-10'>
      {
        books.map((element) =>(
          <div className='border-2 shadow-lg hover:scale-110 cursor-pointer duration-500 shadow-slate-300 flex flex-col gap-4 pb-4 rounded-lg border-slate-30' key={element._id}>
            <img className='rounded-t-lg h-[180px] w-[250px]' src={element.imageURL} alt="" />
            <div className='p-3'>
              <h1 className='font-bold text-xl font-playfair'>{element.name}</h1>
              <p className='-mt-1 text-lg font-medium font-playfair'>{element.author}</p>
              {currentRole == "admin" ?
                <div className='flex justify-between pt-4'>
                  <Link to={`/editBook/${element._id}`}><span className='bg-blue-700 text-lg font-medium px-6 py-1 hover:bg-blue-400 duration-200 rounded text-white'>Edit</span></Link>
                  <button onClick={() =>handleDelete(event,element._id)} className='bg-blue-700 text-lg font-medium px-6 py-1 hover:bg-blue-400 duration-200 rounded text-white'>Delete</button>
                </div> :
                <></>
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Books