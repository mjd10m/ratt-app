const sequelize = require('../config/database');
const User = require('./user');

// Sync models with the database
sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.log(err));

module.exports = {
  User
};