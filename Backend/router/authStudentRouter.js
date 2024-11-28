const express = require('express')
const router = express.Router()
const { studentRegisterConroller,logoutController, verifyController } = require('../controller/authStudentContoller')
const verifyAdmin = require('../middleware/verifyAdmin')
const verifyUser = require('../middleware/verifyUser')

router.post('/login', verifyAdmin, studentRegisterConroller)
router.get('/logout', logoutController)
router.get('/verify',verifyUser, verifyController)

module.exports = router