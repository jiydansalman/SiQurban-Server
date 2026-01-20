const User = require('../models/usermodel');
const UserProfile = require('../models/profileModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    try {
        const { username, email, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'Error',
                message: 'Password and confirm password do not match'
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email sudah terdaftar'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        await UserProfile.create({
            user_id: newUser.user_id,
            full_name: username,
            phone_number: '',
            address: '',
            city: '',
            photo_url: ''
        });

        res.status(201).json({
            status: 'Success', message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error', message: 'Registration failed', error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        const user = await User.findOne({ where: { username} });
        if (!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'User tidak ditemukan'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                status: 'Error',
                message: 'Password salah'
            });
        }

        const token = jwt.sign(
            {user_id: user.user_id, username: user.username},
            process.env.JWT_SECRET || 'secret_siqurban',
            {expiresIn: '12h'}
        );

        res.status(200).json({
            status: 'Success',
            message: 'Berhasil Login',
            token: token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Login gagal',
            error: error.message
        });
    }
};