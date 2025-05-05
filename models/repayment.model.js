const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Loan = require('./loan.model');  // Import Loan model

const Repayment = sequelize.define('Repayment', {
  repayment_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  amount: DataTypes.FLOAT,
  payment_date: DataTypes.DATEONLY,
});

// Define the associate method to set up associations
Repayment.associate = (models) => {
  Repayment.belongsTo(models.Loan);  // Associate Repayment -> Loan
};

module.exports = Repayment;
