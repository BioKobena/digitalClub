const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const productModel = require('../models/productModel');

// Add product route
router.post('/', async (req, res) => {
  const productData = req.body;
  const result = await productModel.addProduct(productData);

  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Get products route
router.get('/', productController.getProducts);

// Delete product route
router.delete('/:productId', async (req, res) => {
  const productId = req.params.productId;
  const result = await productModel.deleteProductById(productId);

  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

module.exports = router;
