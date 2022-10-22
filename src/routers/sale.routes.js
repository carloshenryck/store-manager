const express = require('express');
const saleController = require('../controllers/sale.controller');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);

router.post('/', validateSale, saleController.registerSale);

module.exports = router;