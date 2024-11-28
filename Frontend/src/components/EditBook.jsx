import React, { useEffect, useState } from 'react'
import axios from '../utils/Axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditBook = ({setcurrentRole}) => {

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

    //Edit Book
    const { id } = useParams()
    const [name, setname] = useState("")
    const [author, setauthor] = useState("")
    const [imageURL, setimageURL] = useState("")
    const navigate = useNavigate()

    //getting data of single book to be edited
    async function getSinglebook() {
        try{
            const response = await axios.get(`/book/getSingle/${id}`)
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            else{
                setname(response.data.name)
                setauthor(response.data.author)
                setimageURL(response.data.imageURL)
            }
        }
        catch(err){
            console.log(`Error in Get Single Book - ${err}`)
        }
    }

    useEffect(() =>{
        getSinglebook()
    },[])

    async function handleEdit(event) {
        event.preventDefault()
        try{
            const response = await axios.put(`/book/edit/${id}`, {name: name, author: author, imageURL: imageURL}, {withCredentials: true})
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(response.data.message == "Book Not Found"){
                toast.warn('Book Not Found!', {
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
            if(response.data.message == "Book Updated"){
                toast.success('Book Updated!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    navigate('/books')
            }
        }
        catch(err){
            console.log(`Error in Handle Edit Book - ${err}`)
        }
    }

  return (
    <section className='bg-[#301934] h-[91vh] flex justify-center items-center'>
      <div className='bg-[rgba(255,255,255,0.7)] flex flex-col gap-y-4 rounded-lg p-5 mx-10 w-[350px]'>
        <h1 className='text-3xl font-bold font-playfair text-center'>Edit Book</h1>
        <form className='flex flex-col gap-y-3'>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="name">Name:</label>
            <input value={name} onChange={(event) =>setname(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="text" id='name' name='name' placeholder='Enter Name' />
          </div>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="author">Author Name:</label>
            <input value={author} onChange={(event) =>setauthor(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="text" id='author' name='author' placeholder='Enter Author Name' />
          </div>
          <div className='flex flex-col gap-y-[2px]'>
            <label className='text-lg font-medium' htmlFor="imageURL">Image URL:</label>
            <input value={imageURL} onChange={(event) =>setimageURL(event.target.value)} className='border-[1px] border-slate-300 rounded outline-blue-300 outline-offset-2 px-2 py-1' type="text" id='imageURL' name='imageURL' placeholder='Enter Image URL' />
          </div>
          <button onClick={() =>handleEdit(event)} className='mt-2 bg-green-700 hover:bg-green-500 duration-200 text-white py-1 text-lg rounded font-medium'>Change</button>
        </form>
      </div>
    </section>
  )
}

export default EditBook