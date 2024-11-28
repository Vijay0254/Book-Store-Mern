const express = require('express')
const router = express.Router()
const { countController } = require('../controller/dashboardController')

router.get('/count', countController)

module.exports = router