const { MongoClient } = require('mongodb');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri);
const dbname = "nouraDB";
const usersCollection = client.db(dbname).collection('users');

const userModel = {
  registerUser: async (userData) => {
    try {
      // Insert the user data into the users collection
      await usersCollection.insertOne(userData);
      return { success: true, message: 'User registered successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Registration failed' };
    }
  },

  findUserByEmail: async (email) => {
    return await usersCollection.findOne({ email });
  },

  findUserByUsername: async (username) => {
    return await usersCollection.findOne({ username });
  },
};

module.exports = userModel;
