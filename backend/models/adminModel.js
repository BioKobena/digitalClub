const { MongoClient } = require('mongodb');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri, { useUnifiedTopology: true });
const dbname = "nouraDB";
const adminCollection = client.db(dbname).collection('administrators');

const adminModel = {
  connectToDatabase: async () => {
    try {
      await client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  },

  findAdminByUsername: async (username) => {
    try {
      // Make sure the database connection is established
      if (!client.isConnected) {
        await adminModel.connectToDatabase();
      }

      return await adminCollection.findOne({ username });
    } catch (error) {
      console.error('Error finding admin by username:', error);
      throw error;
    }
  },
};

module.exports = adminModel;
