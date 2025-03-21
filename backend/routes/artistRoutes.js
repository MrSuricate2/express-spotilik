const express = require('express')
const router = express.Router()

const {
    getArtistSong,
    updateArtist,
    deleteArtist
} = require('../controllers/artistController')
const {authenticateToken} = require("../middleware/auth");
router.get('/:id/songs', getArtistSong)
router.put('/:id', updateArtist)
router.delete('/:id', authenticateToken, deleteArtist)
module.exports = router