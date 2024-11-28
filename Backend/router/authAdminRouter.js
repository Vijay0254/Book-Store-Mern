const express = require('express')
const router = express.Router()
const { adminLoginConroller } = require('../controller/authAdminController')

router.post('/login', adminLoginConroller)

module.exports = router