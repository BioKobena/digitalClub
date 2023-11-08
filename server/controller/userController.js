const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri);
const dbname = "nouraDB";
const usersCollection = client.db(dbname).collection('users');

const userController = {
  register: async (req, res) => {
    try {
      // Registration logic
      // ...
      res.json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  login: async (req, res) => {
    try {
      // Login logic
      // ...
      res.json({ message: 'User login successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  },
};

module.exports = userController;
