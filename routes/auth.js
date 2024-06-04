
const express = require('express');
const router = express.Router();
const {User} = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { faker } = require('@faker-js/faker');

// Tạo một tên ngẫu nhiên


// User Register
router.post('/register', async (req, res) => {
    const randomName = faker.person.fullName()
    try {
        const { username, password, email, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, name:  randomName});
        await user.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});


// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY , { expiresIn: '7d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;