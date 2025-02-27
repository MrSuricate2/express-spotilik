const express = require('express');
const router = express.Router();
const { getGenres, updateGenre } = require('../controllers/genreController');

router.get('/', getGenres);
router.put('/:id', updateGenre);

module.exports = router;