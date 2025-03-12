const { User } = require('../models');
const { signToken, signupToken } = require('../utils/auth');

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
    const { username, email, password, firstName, lastName, company, role, companyBanner, status } = req.body;
    const user = await User.create({ username, email, password, firstName, lastName, company, role, companyBanner, status });
    res.status(201).json(user);
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

const userSignupToken = async (req,res) => {
  try {
    const {email, company, role } = req.body
    const token = signupToken(email, company, role)
    res.status(200).json({
      message: 'Signup token created successful',
      token
    })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  userSignupToken
};