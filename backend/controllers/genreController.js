const { Genre } = require('../models');

const getGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateGenre = async (req, res) => {
    try {
        const genre = await Genre.findByPk(req.params.id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        await genre.update(req.body);
        res.json(genre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getGenres,
    updateGenre
};
