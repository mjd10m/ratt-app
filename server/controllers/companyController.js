const { Company } = require('../models');

// Get all users
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCompany = async (req, res) => {
  try {
    const {name, banner} = req.body
    const company = await Company.create({name, banner})
    res.status(200).json({
      message: 'Company added successful',
      company
    })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = {
  getAllCompanies, 
  createCompany
}
