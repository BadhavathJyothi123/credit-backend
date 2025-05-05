const Loan = require('../models/loan.model');
const Repayment = require('../models/repayment.model');

exports.createRepayment = async (req, res) => {
  try {
    const { loan_id, amount, payment_date } = req.body;

    // Find the loan associated with the current user and include repayments
    const loan = await Loan.findOne({
      where: { loan_id, UserId: req.user.user_id },
      include: [Repayment], // Ensure Repayments are included
    });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found or not associated with the current user' });
    }

    // Create repayment linked to the loan
    const repayment = await Repayment.create({
      loan_id, // Ensure this matches the foreign key in Repayment
      amount,
      payment_date,
    });

    // Calculate the total amount paid so far
    const totalPaid = loan.Repayments.reduce((sum, repayment) => sum + repayment.amount, 0) + amount;

    // If total paid is greater than or equal to the loan amount, update the loan status to 'paid'
    if (totalPaid >= loan.amount) {
      await loan.update({ status: 'paid' });
    }

    res.status(201).json(repayment);
  } catch (error) {
    console.error('Error creating repayment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
