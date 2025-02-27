const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Album = sequelize.define('Album', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    cover_image: { type: DataTypes.STRING },
    release_date: { type: DataTypes.DATE }
});

module.exports = Album;