import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Error_404 from './error pages/Error_404'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Books from './components/Books'
import Login from './components/Login'
import Error_500 from './error pages/Error_500'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import Logout from './components/Logout'
import AddBook from './components/AddBook'
import EditBook from './components/EditBook'

const App = () => {

  const [currentRole,setcurrentRole] = useState("")

  return (
    <>
        <Navbar currentRole={currentRole} />
        <Routes>
          <Route path='/' element={<Home setcurrentRole={setcurrentRole} />} />
          <Route path='/books' element={<Books currentRole={currentRole} setcurrentRole={setcurrentRole} />} />
          <Route path='/login' element={<Login setcurrentRole={setcurrentRole} />} />
          <Route path='/dashboard' element={<Dashboard setcurrentRole={setcurrentRole} />} />
          <Route path='/logout' element={<Logout setcurrentRole={setcurrentRole} />} />
          <Route path='/500' element={<Error_500 />} />
          <Route path='addStudent' element={<AddStudent setcurrentRole={setcurrentRole} />} />
          <Route path='/addBook' element={<AddBook setcurrentRole={setcurrentRole} />} />
          <Route path='/editbook/:id' element={<EditBook setcurrentRole={setcurrentRole} />} />
          <Route path='*' element={<Error_404 />} />
        </Routes>
    </>
  ) 
}

export default App