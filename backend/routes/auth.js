const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Hardcoded demo credentials
const DEMO_USER = {
  email: 'admin@crm.com',
  password: 'admin123',
  name: 'Admin User'
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: DEMO_USER.email, name: DEMO_USER.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { email: DEMO_USER.email, name: DEMO_USER.name }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
