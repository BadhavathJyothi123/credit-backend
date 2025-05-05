const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/repayment.controller');

router.use(auth);
router.post('/', controller.createRepayment);

module.exports = router;
