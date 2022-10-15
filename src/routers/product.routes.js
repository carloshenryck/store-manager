const express = require('express');
const productController = require('../controllers/product.controller');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', validateName, productController.registerProduct);

module.exports = router;