const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Customer = sequelize.define('Customer', {
  customer_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  trust_score: DataTypes.INTEGER,
  credit_limit: DataTypes.FLOAT,
});

User.hasMany(Customer);
Customer.belongsTo(User, { foreignKey: 'UserId' });

module.exports = Customer;