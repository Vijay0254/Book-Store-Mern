const jwt = require('jsonwebtoken')
const bcypt = require('bcrypt')
const StudentModel = require('../model/studentModel')

const studentRegisterConroller = async(req,res) =>{
    try{
        const { rollno, username, grade, password } = req.body
        const studentExist = await StudentModel.findOne({username: username})
        if(studentExist){
            return res.status(200).json({message: "Student Already Registered"})
        }
        else{
            const hashedPassord = await bcypt.hash(password, 10)
            const newStudent = new StudentModel({
                rollno: rollno,
                username: username,
                grade: grade,
                password: hashedPassord
            })
            await newStudent.save()
            return res.status(200).json({login: true, role: "student"})
        }
    }
    catch(err){
        console.log(`Error in Student Login Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

const verifyController = (req,res) =>{
    return res.status(200).json({login: true, role: req.role})
}

const logoutController = (req,res) =>{
    try{
        res.clearCookie('token')
        return res.status(200).json({message: "Logout Success"})
    }
    catch(err){
        console.log(`Error in Logout Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

module.exports = { studentRegisterConroller, logoutController, verifyController }