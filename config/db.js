const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_siqurban', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Konesi ke db berhasil');
    } catch (error) {
        console.error('Koneksi ke db gagal:', error);
    }
};

module.exports = { sequelize, connectDB };