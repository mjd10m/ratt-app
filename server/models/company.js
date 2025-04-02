const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  banner: {
    type: DataTypes.STRING,
    allowNull: false,
  }

})

Company.associate = (models) => {
  Company.hasMany(models.User, { foreignKey: 'companyId' });
};

module.exports = Company