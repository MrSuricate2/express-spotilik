const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Album = sequelize.define('Albums', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    cover_image: { type: DataTypes.STRING },
    release_date: { type: DataTypes.DATE },
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Artists',
            key: 'id'
        }
    }
});

module.exports = Album;