const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api'); 

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1', apiRoutes);

//Error Handling
app.use((req, res) => {
    res.status(404).json({ status: 'Error', message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log('Server siQurban running on http://localhost:${PORT}/api/v1/status'); 
});

const { connectDB, sequelize } = require('./config/db');  

const User = require('./models/usermodel');
const UserProfile = require('./models/profileModel');

connectDB();

//Sinkronisasi model ke database
sequelize.sync({ alter:true }).then(() =>{
    console.log('Semua model tersinkronisasi ke database');
});