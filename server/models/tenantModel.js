const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  month: { type: String, required: true },
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  paidDate: { type: Date },
});

const tenantSchema = new mongoose.Schema({
  roomNo: { type: String, required: true },
  name: { type: String, required: true },
  phoneNo: { type: String, required: true },
  occupation: { type: String },
  aadharCard: { type: String },
  rentAmount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  vacateDate: { type: Date },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  payments: [paymentSchema],
});

module.exports = mongoose.model('Tenant', tenantSchema);
