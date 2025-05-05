const sequelize = require('../config/db');
const User = require('./user.model');
const Customer = require('./customer.model');
const Loan = require('./loan.model');
const Repayment = require('./repayment.model');

// Define associations in a centralized way after models are loaded
const models = {
  User,
  Customer,
  Loan,
  Repayment,
};

// Now set associations in a separate function or within the model files
Loan.associate(models);  // Call the associate method for Loan model
Repayment.associate(models);  // Call the associate method for Repayment model

// Sync all models
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully!');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

module.exports = models;
