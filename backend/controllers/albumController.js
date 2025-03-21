const { Album, Track, Artist, TrackArtist, TrackGenre} = require('../models');

const getAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll({
            include: [{
                model: Artist
            }]
        });
        res.json(albums);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id, {
            include: [{
                model: Artist
            }]
        });
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
        const tracks = await Track.findAll({
            where: {
                album_id: req.params.id
            },
            include: [{
                model: Album,
                include: [{
                    model: Artist
                }]
            }]
        });
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

const addSongToAlbum = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        const { genres, artists } = req.body;

        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        if (!artists || artists.length === 0) {
            return res.status(400).json({ error: 'At least one artist must be specified for the track' });
        }

        if (!genres || genres.length === 0) {
            return res.status(400).json({ error: 'At least one genre must be specified for the track' });
        }

        const trackData = { ...req.body, album_id: album.id };
        const newTrack = await Track.create(trackData);

        await artists.map(artist_id =>
            TrackArtist.create({
                track_id: newTrack.id,
                artist_id: artist_id
            })
        );

        await genres.map(genre_id =>
            TrackGenre.create({
                track_id: newTrack.id,
                genre_id: genre_id
            })
        );

        res.status(201).json(newTrack);
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
    addSongToAlbum,
    updateAlbum,
    deleteAlbum
};
