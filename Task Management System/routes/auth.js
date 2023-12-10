const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const session = require('express-session');
const jsonParser = bodyParser.json();

// Registration

router.post('/register',jsonParser, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body    )
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.json({ success: true, message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/login',jsonParser,async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    req.session.token = token;

    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
  }
});
router.get('/logout', (req, res) => {
  // Clear the user session or remove the authentication token
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to log out.' });
    }
    res.clearCookie('token'); // Clear the authentication token from cookies
    res.json({ success: true, message: 'Logged out successfully.' });
  });
});

module.exports = router;
