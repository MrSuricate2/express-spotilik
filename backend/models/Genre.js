const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Genre = sequelize.define('Genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT }
});

module.exports = Genre;