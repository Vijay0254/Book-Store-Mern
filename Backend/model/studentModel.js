const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    grade: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const StudentModel = mongoose.model('Student', studentSchema)
module.exports = StudentModel