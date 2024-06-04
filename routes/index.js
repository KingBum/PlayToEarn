const express = require('express');
const router = express.Router();

// Import individual route files
const userRoutes = require('./user');
const authRoutes = require('./auth');


router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;