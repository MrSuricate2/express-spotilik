const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Track = sequelize.define('Track', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.TIME }
});

module.exports = Track;