const { MongoClient, ObjectId } = require('mongodb');
const uri = require("../config/atlas-uri");

const client = new MongoClient(uri);
const dbname = "nouraDB";
const ordersCollection = client.db(dbname).collection('orders');

const orderModel = {
  placeOrder: async (orderData) => {
    try {
      // Extract the customerName from orderData
      const { cart, total, customerName } = orderData;

      // Construct the order object with customerName
      const order = {
        cart,
        total,
        customerName,
        // Other order details such as date, status, etc.
      };

      // Insert the order into the orders collection
      await ordersCollection.insertOne(order);
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
        { _id: new ObjectId(orderId) },
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
