const express = require('express')
const router = express.Router()

const {
    getArtists,
    addArtist,
    updateArtist,
    deleteArtist
} = require('../controllers/artistController')
router.get('/', getArtists)
router.post('/', addArtist)
router.put('/:id', updateArtist)
router.delete('/:id', deleteArtist)
module.exports = router