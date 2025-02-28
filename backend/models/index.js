const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Artist = require('./Artist');
const Album = require('./Album');
const Track = require('./Track');
const Genre = require('./Genre');
const User = require('./User');

// Définir explicitement les modèles de jointure
const TrackArtist = sequelize.define('Tracks_has_Artists', {
    track_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tracks',
            key: 'id'
        }
    },
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Artists',
            key: 'id'
        }
    }
});

const TrackGenre = sequelize.define('Tracks_has_Genres', {
    track_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tracks',
            key: 'id'
        }
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Genres',
            key: 'id'
        }
    }
});

// Table de jointure Tracks_has_Artists avec les modèles explicites
Track.belongsToMany(Artist, { through: TrackArtist, foreignKey: 'track_id' });
Artist.belongsToMany(Track, { through: TrackArtist, foreignKey: 'artist_id' });

// Table de jointure Track_genre avec les modèles explicites
Track.belongsToMany(Genre, { through: TrackGenre, foreignKey: 'track_id' });
Genre.belongsToMany(Track, { through: TrackGenre, foreignKey: 'genre_id' });

// Relations classiques
Artist.hasMany(Album, { foreignKey: 'artist_id' });
Album.belongsTo(Artist, { foreignKey: 'artist_id' });

Album.hasMany(Track, { foreignKey: 'album_id' });
Track.belongsTo(Album, { foreignKey: 'album_id' });

module.exports = { sequelize, Artist, Album, Track, Genre, User, TrackArtist, TrackGenre };