const productModel = require('../models/productModel'); // Import the product model

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await productModel.getProducts(); // Use the product model to retrieve products
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },
  // Other controller functions related to products
};

module.exports = productController;
