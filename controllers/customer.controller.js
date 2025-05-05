const  Customer  = require('../models/customer.model');

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      trust_score: req.body.trust_score, // Make sure field names are correct
      credit_limit: req.body.credit_limit,
      UserId: req.user.user_id, // UserId should be taken from the authenticated user
    });
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating customer', error });
  }
};

exports.getCustomers = async (req, res) => {
  const customers = await Customer.findAll({ where: { UserId: req.user.user_id } });
  res.json(customers);
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: {
        customer_id: req.params.id,
        UserId: req.user.user_id
      }
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving customer', error });
  }
};


exports.updateCustomer = async (req, res) => {
  const customer = await Customer.findOne({ where: { customer_id: req.params.id, UserId: req.user.user_id } });
  if (!customer) return res.sendStatus(404);
  await customer.update(req.body);
  res.json(customer);
};

exports.deleteCustomer = async (req, res) => {
  const deleted = await Customer.destroy({ where: { customer_id: req.params.id, UserId: req.user.user_id } });
  res.json({ deleted });
};