const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./usermodel');

const UserProfile = sequelize.define('UserProfile', {
    profile_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name:{
        type: DataTypes.STRING,
    },
    phone_number:{
        type: DataTypes.STRING,
    },
    address:{
        type: DataTypes.TEXT,
    },
    city:{
        type: DataTypes.STRING,
    },
    photo_url:{
        type: DataTypes.STRING,
    }
}, {
    tableName: 'user_profiles',
    underscored: true
});

//Relasi
User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserProfile;
