const { User } = require('../models');
const { signToken, signupToken, checkSignupToken } = require('../utils/auth');
const sendSignupEmail  = require('../utils/signupEmail')

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, companyId, role, status } = req.body;
    const user = await User.create({ username, email, password, firstName, lastName, companyId, role, status });
    const token = signToken(user)
    res.status(200).json({
      message: 'Signup & Login successful',
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.errors[0].message });
  }
};

const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body
    const user = await User.findOne({where: {username: username}})
    if(!user) {
      return res.status(401).json({message: "Incorrect Credentials"})
    }
    const correctPassword = await user.isCorrectPassword(password)
    if(!correctPassword) {
      return res.status(401).json({message: "Incorrect Credentials"})
    }
    const token = signToken(user)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSignupToken = async (req,res) => {
  try {
    const {email, companyId, role } = req.body
    const token = signupToken(email, companyId, role)
    sendSignupEmail(
      email,
      'Welcome to RATT!',
      `This email was sent via Microsoft Graph API 🎉 and fuck GoDaddy - Ape Coding
      http://localhost:3000/signup?token=${token}`
    );
    res.status(200).json({
      message: 'Signup token created successful',
      token
    })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const validateSignupToken = async (req, res) => {
  try {
    const {token} = req.body
    const isValid = checkSignupToken(token)
    if(isValid){
      res.status(200).json({
        message: 'Valid Token',
        token,
        isValid
      })
    } else {
      res.status(401).json({
        message: 'Invalid Token',
        isValid
      })
    }
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  createSignupToken,
  validateSignupToken
};