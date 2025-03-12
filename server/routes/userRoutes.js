const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for users
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/signuptoken', userController.userSignupToken);

module.exports = router;