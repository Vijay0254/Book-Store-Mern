const AdminModel = require('../model/adminModel')
const StudentModel = require('../model/studentModel')
const BookModel = require('../model/bookModel')

const countController = async(req,res) =>{
    try{
        const adminCount = await AdminModel.countDocuments()
        const studentCount = await StudentModel.countDocuments()
        const bookCount = await BookModel.countDocuments()
        return res.status(200).json({adminCount: adminCount, studentCount: studentCount, bookCount: bookCount})
    }
    catch(err){
        console.log(`Error in Count Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

module.exports = { countController }