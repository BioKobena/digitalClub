const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri, { useUnifiedTopology: true });

const userController = {
  connectToDatabase: async () => {
    try {
      await client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  },

  register: async (req, res) => {
    try {
      await userController.connectToDatabase();

      const { username, email, password } = req.body;

      const existingUserByUsername = await userModel.findUserByUsername(username);
      const existingUserByEmail = await userModel.findUserByEmail(email);

      if (existingUserByUsername || existingUserByEmail) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await userModel.registerUser({ username, email, password: hashedPassword });

      res.json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Registration failed' });
    } finally {
      await client.close();
    }
  },

  login: async (req, res) => {
    try {
      await userController.connectToDatabase();

      const { email, password } = req.body;

      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      
      res.json({ message: 'User login successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    } finally {
      await client.close();
    }
  },

  
};

module.exports = userController;
