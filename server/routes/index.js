const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes')

router.use('/api', userRoutes)
router.use('/api', companyRoutes)

module.exports = router