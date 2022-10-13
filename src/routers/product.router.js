const express = require('express');
const products = require('../controllers/product.controller');

const router = express.Router();

router.get('/', products.getAllProducts);

router.get('/:id', products.getProductById);

module.exports = router;