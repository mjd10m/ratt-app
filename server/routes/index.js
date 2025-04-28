const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes')
const priceRoutes = require('./priceRoutes')

router.use('/api', userRoutes)
router.use('/api', companyRoutes)
router.use('/api', priceRoutes)

module.exports = router