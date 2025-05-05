const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Customer = require('./customer.model');
const Repayment = require('./repayment.model');  // Import Repayment model

const Loan = sequelize.define('Loan', {
  loan_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  description: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  issue_date: DataTypes.DATEONLY,
  due_date: DataTypes.DATEONLY,
  frequency: DataTypes.ENUM('bi-weekly', 'monthly'),
  interest_percent: DataTypes.FLOAT,
  grace_days: DataTypes.INTEGER,
  status: { type: DataTypes.ENUM('pending', 'paid', 'overdue'), defaultValue: 'pending' },
});

// Define the associate method to set up associations
Loan.associate = (models) => {
  User.hasMany(Loan);
  Loan.belongsTo(User);

  Customer.hasMany(Loan);
  Loan.belongsTo(Customer);

  Loan.hasMany(models.Repayment);  // Associate Loan -> Repayment
  models.Repayment.belongsTo(Loan);  // Associate Repayment -> Loan
};

module.exports = Loan;
