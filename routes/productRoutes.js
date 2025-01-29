const express = require('express');
const axios = require('axios');
const router = express.Router();

let products = [
  { id: 101, name: "Laptop", price: 1000 },
  { id: 102, name: "Smartphone", price: 500 }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// Get product by ID along with related orders
router.get('/:id/orders', async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  try {
    // Change URL to the correct Order Service port
    const { data: orders } = await axios.get(`http://localhost:3002/orders/product/${productId}`);
    res.json({ ...product, orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

module.exports = router;
