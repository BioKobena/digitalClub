const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri);
const dbname = "nouraDB";
const ordersCollection = client.db(dbname).collection('orders');

const orderModel = {
  placeOrder: async (orderData) => {
    try {
      // Insert the order data into the orders collection
      await ordersCollection.insertOne(orderData);
      return { success: true, message: 'Order placed successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Failed to place order' };
    }
  },

  getOrders: async () => {
    return await ordersCollection.find({}).toArray();
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      // Use a MongoDB update operation to update the order's status
      const result = await ordersCollection.updateOne(
        { _id: ObjectId(orderId) },
        { $set: { status } }
      );

      if (result.modifiedCount === 1) {
        return { success: true, message: 'Order status updated successfully' };
      } else {
        return { success: false, error: 'Order status update failed' };
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Failed to update order status' };
    }
  },
};

module.exports = orderModel;
