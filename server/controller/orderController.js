const orderModel = require('../models/orderModel');

const orderController = {
  getOrders: async (req, res) => {
    try {
      const orders = await orderModel.getOrders();
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  },

  // Other controller functions related to orders
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const result = await orderModel.updateOrderStatus(orderId, status);

    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

module.exports = {
  getOrders: orderController.getOrders,
  updateOrderStatus,
  // Other controller functions related to orders
};
