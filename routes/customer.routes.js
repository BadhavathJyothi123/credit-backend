const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/customer.controller');

router.use(auth);
router.post('/', controller.createCustomer);
router.get('/', controller.getCustomers);
router.get('/:id', controller.getCustomerById); 
router.put('/:id', controller.updateCustomer);
router.delete('/:id', controller.deleteCustomer);

module.exports = router;
