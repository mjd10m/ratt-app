require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sendSignupEmail = require('./utils/signupEmail')

// Middleware
app.use(express.json());
app.use(cors())
app.use('/api', userRoutes);

const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

