const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const userModel = require('../models/userModel');

// User registration route
router.post('/register', async (req, res) => {
  const userData = req.body;
  const result = await userModel.registerUser(userData);

  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// User login route
router.post('/login', userController.login);

module.exports = router;
