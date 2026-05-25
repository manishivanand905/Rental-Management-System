const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  month: { type: String, required: true },
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  paidDate: { type: Date },
});

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    aadhaarNo: { type: String, required: true },
  },
  { _id: false }
);

const tenantSchema = new mongoose.Schema({
  roomNo: { type: String, required: true, trim: true },
  residentType: { type: String, enum: ['Owner', 'Tenant'], default: 'Tenant' },
  name: { type: String, required: true, trim: true },
  phoneNo: { type: String, required: true, trim: true },
  occupation: { type: String, trim: true, default: '' },
  aadharCard: { type: String, trim: true, default: '' },
  rentAmount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  vacateDate: { type: Date },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  profileImage: {
    url: { type: String, trim: true, default: '' },
    public_id: { type: String, trim: true, default: '' },
  },
  members: { type: [memberSchema], default: [] },
  payments: { type: [paymentSchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);
