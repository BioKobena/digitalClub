const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const adminModel = require('../models/adminModel');

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await adminModel.findAdminByUsername(username);

  if (admin) {
    // Check password and authenticate admin
    if (password === admin.password) {
      res.json({ message: 'Admin login successful' });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } else {
    res.status(401).json({ error: 'Admin not found' });
  }
});

module.exports = router;
