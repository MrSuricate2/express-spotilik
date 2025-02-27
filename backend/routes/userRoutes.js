const express = require('express')
const router = express.Router()

const {
    addUsers,
    loginUsers,
    deleteUsers
} = require('../controllers/artistController')
router.post('/signup', addUsers)
router.post('/login', loginUsers)
router.delete('/:id', deleteUsers)
module.exports = router