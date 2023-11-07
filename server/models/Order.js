const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
