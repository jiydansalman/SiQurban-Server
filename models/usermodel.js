const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allownull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allownull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password:{
        type: DataTypes.STRING,
        allownull: false
    },
    role:{
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    } 
}, {
    tableName: 'users',
    underscored: true
});

module.exports = User;
