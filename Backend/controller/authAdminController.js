const jwt = require('jsonwebtoken')
const bcypt = require('bcrypt')
const AdminModel = require('../model/adminModel')
const StudentModel = require('../model/studentModel')

const adminLoginConroller = async(req,res) =>{
    try{
        const { username, password, role } = req.body
        if(!username || !password){
            return res.status(200).json({message: 'Details Missing'})
        }
        if(role == 'admin'){
            const adminExist = await AdminModel.findOne({username: username})
            if(!adminExist){
                return res.status(200).json({message: 'Admin not Registered'})
            }
            else{
                const verifyPassword = await bcypt.compare(password, adminExist.password)
                if(verifyPassword){
                    const token = jwt.sign({id: adminExist._id, username: adminExist.username, role: "admin"}, process.env.ADMIN_SECRET_KEY, {expiresIn: '1d'})
                    res.cookie('token', token)
                    return res.status(200).json({login: true, role: 'admin'})
                }
                else{
                    return res.status(200).json({message: 'Password is wrong'})
                }
            }
        }
        else if(role == 'student'){
            if(!username || !password){
                return res.status(200).json({message: 'Details Missing'})
            }
            const studentExist = await StudentModel.findOne({username: username})
            if(!studentExist){
                return res.status(200).json({message: "Student not Registered"})
            }
            else{
                const verifyPassword = await bcypt.compare(password, studentExist.password)
                if(verifyPassword){
                    const token = jwt.sign({id: studentExist._id, username: studentExist.username, role: "student"}, process.env.STUDENT_SECRET_KEY, {expiresIn: '1d'})
                    res.cookie('token', token)
                    return res.status(200).json({login: true, role: 'student'})
                }
                else{
                    return res.status(200).json({message: 'Password is wrong'})
                }
            }
        }
        else{
            return res.status(200).json({message: "Details Missing"})
        }
    }
    catch(err){
        console.log(`Error in Admin Login Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

module.exports = { adminLoginConroller }