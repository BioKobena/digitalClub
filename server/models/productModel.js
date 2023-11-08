const { MongoClient, ObjectId } = require('mongodb');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri);
const dbname = "nouraDB";
const productsCollection = client.db(dbname).collection('products');

const productModel = {
  addProduct: async (productData) => {
    try {
      // Insert the product data into the products collection
      await productsCollection.insertOne(productData);
      return { success: true, message: 'Product added successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Failed to add product' };
    }
  },

  getProducts: async () => {
    return await productsCollection.find().toArray();
  },

  deleteProductById: async (productId) => {
    try {
      // Delete the product with the specified ID
      await productsCollection.deleteOne({ _id: new ObjectId(productId) });
      return { success: true, message: 'Product deleted successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Failed to delete product' };
    }
  },
};

module.exports = productModel;
