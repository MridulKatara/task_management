const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser } = require('../controllers/userController');

// POST route for user registration
router.post('/register', registerUser);

// POST route for user authentication
router.post('/login', authenticateUser);

module.exports = router;
