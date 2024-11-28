import React, { useEffect } from 'react'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'

const Logout = ({setcurrentRole}) => {
    const navigate = useNavigate()

    async function logout() {
        try{
        const response = await axios.get('/auth/student/logout', {withCredentials: true})
        if(response.data.message == "Internal Server Error"){
            navigate('/500')
        }
        if(response.data.message == "Logout Success"){
            console.log(response.data.message)
            setcurrentRole("")
            navigate('/')
        }
        }
        catch(err){
            console.log(`Error in Handle Logout - ${err}`)
        }
    }

    useEffect(() =>{
        logout()    
    },[])
}

export default Logout