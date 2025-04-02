const sequelize = require('../config/database');
const User = require('./user');
const Company = require('./company');

const models = { User, Company };
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});
// Sync models with the database
sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.log(err));

module.exports = {
  User,
  Company
};