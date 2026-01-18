const User = require('../models/usermodel');
const UserProfile = require('../models/profileModel');
const bcrypt = require('bcrypt');

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