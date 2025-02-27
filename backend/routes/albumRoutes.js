const express = require('express');
const router = express.Router();
const {
    getAlbums,
    getAlbumById,
    getAlbumTracks,
    addAlbum,
    updateAlbum,
    deleteAlbum
} = require('../controllers/albumController');

router.get('/', getAlbums);
router.get('/:id', getAlbumById);
router.get('/:id/songs', getAlbumTracks);
router.post('/', addAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

module.exports = router;