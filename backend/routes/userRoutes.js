const express = require('express')
const router = express.Router()

const {
    addUser,
    deleteUser,
    loginUser
} = require('../controllers/userController')
router.post('/signup', addUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)
module.exports = router