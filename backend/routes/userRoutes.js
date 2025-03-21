const express = require('express')
const router = express.Router()

const {
    addUser,
    deleteUser,
    loginUser
} = require('../controllers/userController')
const {authenticateToken} = require("../middleware/auth");
router.post('/signup', addUser)
router.post('/login', loginUser)
router.delete('/:id', authenticateToken, deleteUser)
module.exports = router