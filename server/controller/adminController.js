const { MongoClient } = require('mongodb');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri);
const dbname = "nouraDB";
const adminCollection = client.db(dbname).collection('administrators');

const adminController = {
  adminLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the admin exists
      const admin = await adminCollection.findOne({ username });

      if (!admin) {
        return res.status(401).json({ error: 'Admin not found' });
      }

      // Check if the provided password matches the stored password
      if (password === admin.password) {
        // If username and password are correct, consider the login successful
        res.json({ message: 'Admin login successful' });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Admin login failed' });
    }
  },
};

module.exports = adminController;
