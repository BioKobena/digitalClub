const { MongoClient } = require('mongodb');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri);
const dbname = "nouraDB";
const adminCollection = client.db(dbname).collection('administrators');

const adminModel = {
  findAdminByUsername: async (username) => {
    return await adminCollection.findOne({ username });
  },
};

module.exports = adminModel;
