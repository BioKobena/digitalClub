const { MongoClient } = require('mongodb');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri);
const dbname = "nouraDB";
const adminCollection = client.db(dbname).collection('administrators');

const adminController = {
  adminLogin: async (req, res) => {
    try {
      // Admin login logic
      // ...
      res.json({ message: 'Admin login successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Admin login failed' });
    }
  },
};

module.exports = adminController;
