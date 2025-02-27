const { Album, Track } = require('../models');

const getAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.json(album);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAlbumTracks = async (req, res) => {
    try {
        const tracks = await Track.findAll({ where: { album_id: req.params.id } });
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body);
        res.status(201).json(album);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateAlbum = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        await album.update(req.body);
        res.json(album);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        await album.destroy();
        res.json({ message: `Deleted album ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAlbums,
    getAlbumById,
    getAlbumTracks,
    addAlbum,
    updateAlbum,
    deleteAlbum
};
