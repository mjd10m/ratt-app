const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.get('/prices', priceController.getAllPrices);

module.exports = router