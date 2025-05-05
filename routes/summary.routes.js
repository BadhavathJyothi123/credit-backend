const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/summary.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/', authenticate, getSummary);

module.exports = router;
