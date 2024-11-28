const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const connectDb = require('./db/connectDb')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authAdminRouter = require('./router/authAdminRouter')
const authStudentRouter = require('./router/authStudentRouter')
const bookRouter = require('./router/bookRouter')
const dashboardRouter = require('./router/dashboardRouter')

//Middlewares
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Path
app.use('/auth/admin', authAdminRouter)
app.use('/auth/student', authStudentRouter)
app.use('/book', bookRouter)
app.use('/dashboard', dashboardRouter)

app.listen(PORT, (err) =>{
    err ? console.log(`Error in running Server in Port ${PORT} - ${err}`) : console.log(`Server is running in Port ${PORT}`)
    connectDb()
})