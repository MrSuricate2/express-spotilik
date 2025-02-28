const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Track = sequelize.define('Tracks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.TIME },
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Albums',
            key: 'id'
        }
    }
});

module.exports = Track;