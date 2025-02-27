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

router.get('/', getAlbums);
router.get('/:id', getAlbumById);
router.get('/:id/songs', getAlbumTracks);
router.post('/', addAlbum);
router.post('/:id/songs', addSongToAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

module.exports = router;
