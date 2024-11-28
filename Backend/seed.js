const bcrypt = require('bcrypt')
const AdminModel = require('./model/adminModel')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./db/connectDb')

async function adminAccount() {
    connectDb()
    try{
        const adminCount = await AdminModel.countDocuments()
        if(adminCount == 0){
            const hashedPassword = await bcrypt.hash('adminPasword', 10)
            const newAdmin = new AdminModel({
                username: 'admin',
                password: hashedPassword
            })
            await newAdmin.save()
        }
    }
    catch(err){
        console.log(`Error in Admin Account - ${err}`)
    }
}

adminAccount()