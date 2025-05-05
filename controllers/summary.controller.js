const Loan = require('../models/loan.model');
const Repayment = require('../models/repayment.model');
const { Op } = require('sequelize');

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    // Total loaned amount (Make sure `UserId` matches the column name in your model)
    const totalLoaned = await Loan.sum('amount', {
      where: { UserId: userId }
    });

    // Total collected amount
    const totalCollected = await Repayment.sum('amount', {
      where: { userId }
    });

    // Overdue amount calculation
    const today = new Date();
    const overdueLoans = await Loan.findAll({
      where: {
        UserId: userId,
        dueDate: { [Op.lt]: today },
        status: { [Op.ne]: 'paid' },
      },
    });

    // Assuming you're summing the entire loan amount for overdue loans
    const overdueAmount = overdueLoans.reduce((sum, loan) => sum + loan.amount, 0);

    // Average repayment time — Bonus (assuming `paymentDate` exists)
    const repayments = await Repayment.findAll({
      where: { userId },
      include: [{ model: Loan }],
    });

    let totalDays = 0;
    let count = 0;

    repayments.forEach(r => {
      if (r.Loan && r.Loan.issueDate) {
        const diff = new Date(r.date) - new Date(r.Loan.issueDate); // `r.date` should be `paymentDate` or the correct field
        totalDays += diff / (1000 * 60 * 60 * 24); // convert ms to days
        count++;
      }
    });

    const avgRepaymentTime = count > 0 ? (totalDays / count).toFixed(1) : 0;

    // Send the response with the calculated values
    res.json({
      totalLoaned: totalLoaned || 0,
      totalCollected: totalCollected || 0,
      overdueAmount,
      avgRepaymentTime
    });
  } catch (err) {
    console.error('Error getting summary:', err);
    res.status(500).json({ error: 'Failed to fetch summary data' });
  }
};
