const { Artist } = require('../models');

const getArtists = async (req, res) => {
    try {
        const artists = await Artist.findAll();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body);
        res.status(201).json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        await artist.update(req.body);
        res.json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        await artist.destroy();
        res.json({ message: `Deleted artist ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getArtists,
    addArtist,
    updateArtist,
    deleteArtist
};
