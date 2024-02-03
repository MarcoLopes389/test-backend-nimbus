const { DataTypes } = require('sequelize')
const sequelize = require("../sequelize");


module.exports = sequelize.define('Alert', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    event: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    damage: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'alert',
    timestamps: false,
})