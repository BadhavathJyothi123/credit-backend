const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/loan.controller');

router.use(auth);
router.post('/', controller.createLoan);
router.get('/', controller.getLoans);

module.exports = router;