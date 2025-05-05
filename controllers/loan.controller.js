const Loan = require('../models/loan.model');
const Customer = require('../models/customer.model');
const Repayment = require('../models/repayment.model'); // optional

exports.createLoan = async (req, res) => {
  try {
    const loan = await Loan.create({ ...req.body, UserId: req.user.user_id });
    res.status(201).json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      where: { UserId: req.user.user_id },
      include: [Customer, Repayment]
    });
    res.status(200).json(loans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
