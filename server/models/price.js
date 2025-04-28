const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Price = sequelize.define('Price', {
  level_1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level_2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level_3: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level_4: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Price