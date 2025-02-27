const express = require('express')
const router = express.Router()

const {
    getArtistSong,
    updateArtist,
    deleteArtist
} = require('../controllers/artistController')
router.get('/:id/songs', getArtistSong)
router.put('/:id', updateArtist)
router.delete('/:id', deleteArtist)
module.exports = router