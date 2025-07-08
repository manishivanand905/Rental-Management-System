const Tenant = require('../models/tenantModel');
const mongoose = require('mongoose');

// @desc    Get all tenants
// @route   GET /api/tenants
// @access  Public
const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single tenant
// @route   GET /api/tenants/:id
// @access  Public
const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }

    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tenant not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Create a tenant
// @route   POST /api/tenants
// @access  Public
const createTenant = async (req, res) => {
  const {
    roomNo,
    name,
    phoneNo,
    occupation,
    aadharCard,
    rentAmount,
    startDate,
    vacateDate,
    status,
  } = req.body;

  try {
    const newTenant = new Tenant({
      roomNo,
      name,
      phoneNo,
      occupation,
      aadharCard,
      rentAmount,
      startDate,
      vacateDate,
      status,
      payments: generatePayments(startDate, rentAmount),
    });

    const tenant = await newTenant.save();
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a tenant
// @route   PUT /api/tenants/:id
// @access  Public
const updateTenant = async (req, res) => {
  const {
    roomNo,
    name,
    phoneNo,
    occupation,
    aadharCard,
    rentAmount,
    startDate,
    vacateDate,
    status,
    payments,
  } = req.body;

  // Build tenant object
  const tenantFields = {};
  if (roomNo) tenantFields.roomNo = roomNo;
  if (name) tenantFields.name = name;
  if (phoneNo) tenantFields.phoneNo = phoneNo;
  if (occupation) tenantFields.occupation = occupation;
  if (aadharCard) tenantFields.aadharCard = aadharCard;
  if (rentAmount) tenantFields.rentAmount = rentAmount;
  if (startDate) tenantFields.startDate = startDate;
  if (vacateDate) tenantFields.vacateDate = vacateDate;
  if (status) tenantFields.status = status;
  if (payments) tenantFields.payments = payments;

  try {
    let tenant = await Tenant.findById(req.params.id);

    if (!tenant) return res.status(404).json({ msg: 'Tenant not found' });

    tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { $set: tenantFields },
      { new: true }
    );

    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a tenant
// @route   DELETE /api/tenants/:id
// @access  Public
const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }

    await tenant.deleteOne();

    res.json({ msg: 'Tenant removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tenant not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Mark payment as paid
// @route   PUT /api/tenants/:tenantId/payments/:paymentId/paid
// @access  Public
const markPaymentAsPaid = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.tenantId);

    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }

    const payment = tenant.payments.id(req.params.paymentId);

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.status = 'Paid';
    payment.paidDate = new Date();

    await tenant.save();

    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Mark payment as unpaid
// @route   PUT /api/tenants/:tenantId/payments/:paymentId/unpaid
// @access  Public
const markPaymentAsUnpaid = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.tenantId);

    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }

    const payment = tenant.payments.id(req.params.paymentId);

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.status = 'Unpaid';
    payment.paidDate = null;

    await tenant.save();

    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const generatePayments = (startDate, rentAmount) => {
  const payments = [];
  const start = new Date(startDate);
  const currentDate = new Date();

  let paymentDate = new Date(start);
  let monthCounter = 0;

  while (paymentDate <= currentDate || monthCounter < 12) {
    const dueDate = new Date(paymentDate);
    dueDate.setDate(6); // Due on 6th of each month

    payments.push({
      _id: new mongoose.Types.ObjectId(), // Explicitly generate _id
      month: paymentDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      }),
      dueDate: dueDate,
      amount: rentAmount,
    });

    paymentDate.setMonth(paymentDate.getMonth() + 1);
    monthCounter++;
  }

  return payments;
};

module.exports = {
  getTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
  markPaymentAsPaid,
  markPaymentAsUnpaid,
};
