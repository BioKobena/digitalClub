const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const orderModel = require('../models/orderModel');

// Place order route
router.post('/', async (req, res) => {
  const orderData = req.body;
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
