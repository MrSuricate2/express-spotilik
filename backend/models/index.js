const sequelize = require('../config/db');
const Artist = require('./Artist');
const Album = require('./Album');
const Track = require('./Track');
const Genre = require('./Genre');
const User = require('./User');

// Table de jointure Tracks_has_Artists
Track.belongsToMany(Artist, { through: 'Tracks_has_Artists', foreignKey: 'track_id' });
Artist.belongsToMany(Track, { through: 'Tracks_has_Artists', foreignKey: 'artist_id' });

// Table de jointure Track_genre
Track.belongsToMany(Genre, { through: 'Track_genre', foreignKey: 'track_id' });
Genre.belongsToMany(Track, { through: 'Track_genre', foreignKey: 'genre_id' });

// Relations classiques
Artist.hasMany(Album, { foreignKey: 'artist_id' });
Album.belongsTo(Artist, { foreignKey: 'artist_id' });

Album.hasMany(Track, { foreignKey: 'album_id' });
Track.belongsTo(Album, { foreignKey: 'album_id' });

module.exports = { sequelize, Artist, Album, Track, Genre, User };
