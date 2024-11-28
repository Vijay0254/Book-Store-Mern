const express = require('express')
const router = express.Router()
const { postController, getController, deleteController, editController, getSingleBookController } = require('../controller/bookController')

router.post('/add', postController)
router.get('/get', getController)
router.delete('/delete/:id', deleteController)
router.put('/edit/:id', editController)
router.get('/getSingle/:id', getSingleBookController)

module.exports = router