const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const orderModel = require('../models/orderModel');

// Place order route
router.post('/', async (req, res) => {
  // Extract customerName from the request body
  const { cart, total, customerName } = req.body;

  // Construct the order data object
  const orderData = {
    cart,
    total,
    customerName,
    // Other order details such as date, status, etc.
  };

  const result = await orderModel.placeOrder(orderData);

  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Update order status route
router.put('/:orderId', orderController.updateOrderStatus);

// Get orders route
router.get('/', orderController.getOrders);

module.exports = router;
