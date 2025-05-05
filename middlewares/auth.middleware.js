const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // ✅ Correct import

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    req.user = await User.findByPk(decoded.id); // This now works if User is imported correctly
    if (!req.user) return res.status(401).json({ message: 'User not found' });

    next();
  } catch (err) {
    console.error('Token error:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
