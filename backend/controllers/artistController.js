const { Artist, Track, Album} = require('../models');

const getArtistSong = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id, {
            include: {
                model: Track,
                through: { attributes: [] },
                include: {
                    model: Album,
                    include: [{
                        model: Artist
                    }]
                }
            }
        });

        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.json(artist.Tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    getArtistSong,
    updateArtist,
    deleteArtist
};
