const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Endpoint pour l'inscription
router.post('/register', userController.register);

// Endpoint pour la connexion
router.post('/login', userController.login);

// router.get('/profile', userController.getProfile);
module.exports = router;
