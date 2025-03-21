// routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAlbums,
    getAlbumById,
    getAlbumTracks,
    addAlbum,
    addSongToAlbum,
    updateAlbum,
    deleteAlbum
} = require('../controllers/albumController');
const {authenticateToken} = require("../middleware/auth");

router.get('/', getAlbums);
router.get('/:id', getAlbumById);
router.get('/:id/songs', getAlbumTracks);
router.post('/', addAlbum);
router.post('/:id/songs', addSongToAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', authenticateToken, deleteAlbum);

module.exports = router;
