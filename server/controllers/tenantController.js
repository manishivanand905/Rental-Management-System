const Tenant = require('../models/tenantModel');
const mongoose = require('mongoose');
const {
  destroyCloudinaryImage,
  uploadTenantImage,
} = require('../utils/cloudinary');

const formatMonthLabel = (date) =>
  date.toLocaleString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

const parseDateValue = (value) => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      12,
      0,
      0,
      0
    );
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day, 12, 0, 0, 0);
  }

  const parsed = new Date(value);

  return new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
    12,
    0,
    0,
    0
  );
};

const addCalendarMonths = (date, monthsToAdd) => {
  const source = parseDateValue(date);
  const targetYear = source.getFullYear();
  const targetMonth = source.getMonth() + monthsToAdd;
  const targetDay = source.getDate();
  const lastDayOfTargetMonth = new Date(
    targetYear,
    targetMonth + 1,
    0
  ).getDate();

  return new Date(
    targetYear,
    targetMonth,
    Math.min(targetDay, lastDayOfTargetMonth),
    source.getHours(),
    source.getMinutes(),
    source.getSeconds(),
    source.getMilliseconds()
  );
};

const monthsBetween = (fromDate, toDate) =>
  (parseDateValue(toDate).getFullYear() - parseDateValue(fromDate).getFullYear()) * 12 +
  (parseDateValue(toDate).getMonth() - parseDateValue(fromDate).getMonth());

const toPaymentKey = (date) => {
  const normalized = parseDateValue(date);
  const year = normalized.getFullYear();
  const month = String(normalized.getMonth() + 1).padStart(2, '0');
  const day = String(normalized.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const normalizeMembers = (members = []) =>
  members
    .filter((member) => member && (member.name || member.aadhaarNo))
    .map((member) => ({
      name: String(member.name || '').trim(),
      aadhaarNo: String(member.aadhaarNo || '').trim(),
    }))
    .filter((member) => member.name && member.aadhaarNo);

const normalizeProfileImage = (profileImage = {}) => {
  if (!profileImage || typeof profileImage !== 'object') {
    return {};
  }

  const url = typeof profileImage.url === 'string' ? profileImage.url.trim() : '';
  const publicId =
    typeof profileImage.public_id === 'string' ? profileImage.public_id.trim() : '';

  return {
    ...(url ? { url } : {}),
    ...(publicId ? { public_id: publicId } : {}),
  };
};

const generatePayments = (startDate, rentAmount, existingPayments = []) => {
  const start = parseDateValue(startDate);
  const today = new Date();
  const existingPaymentsByDueDate = new Map(
    existingPayments.map((payment) => [toPaymentKey(payment.dueDate), payment])
  );
  const cycleCount = Math.max(12, monthsBetween(start, today) + 12);

  return Array.from({ length: cycleCount }, (_, index) => {
    const dueDate = addCalendarMonths(start, index);
    const existingPayment = existingPaymentsByDueDate.get(toPaymentKey(dueDate));

    return {
      _id: existingPayment?._id || new mongoose.Types.ObjectId(),
      month: formatMonthLabel(dueDate),
      dueDate,
      amount: Number(rentAmount),
      status: existingPayment?.status || 'Unpaid',
      paidDate: existingPayment?.paidDate || null,
    };
  });
};

const getPaymentSignature = (payment) => [
  toPaymentKey(payment.dueDate),
  Number(payment.amount || 0),
  payment.status || 'Unpaid',
  payment.paidDate ? parseDateValue(payment.paidDate).toISOString() : '',
].join('|');

const shouldRefreshPayments = (currentPayments = [], nextPayments = []) => {
  if (currentPayments.length !== nextPayments.length) {
    return true;
  }

  return currentPayments.some((payment, index) => {
    const nextPayment = nextPayments[index];
    return !nextPayment || getPaymentSignature(payment) !== getPaymentSignature(nextPayment);
  });
};

const syncTenantPayments = async (tenant) => {
  if (!tenant?.startDate) {
    return tenant;
  }

  const nextPayments = generatePayments(tenant.startDate, tenant.rentAmount, tenant.payments || []);

  if (shouldRefreshPayments(tenant.payments || [], nextPayments)) {
    tenant.payments = nextPayments;
    await tenant.save();
  }

  return tenant;
};

const buildTenantPayload = (payload, existingTenant, overrides = {}) => {
  const roomNo = payload.roomNo ?? existingTenant?.roomNo;
  const residentType = payload.residentType ?? existingTenant?.residentType ?? 'Tenant';
  const name = payload.name ?? existingTenant?.name;
  const phoneNo = payload.phoneNo ?? existingTenant?.phoneNo;
  const occupation = payload.occupation ?? existingTenant?.occupation;
  const aadharCard = payload.aadharCard ?? existingTenant?.aadharCard;
  const rentAmount = Number(payload.rentAmount ?? existingTenant?.rentAmount);
  const startDate = parseDateValue(payload.startDate ?? existingTenant?.startDate);
  const vacateDate = parseDateValue(payload.vacateDate ?? existingTenant?.vacateDate);
  const status = payload.status ?? existingTenant?.status ?? 'Active';
  const profileImage =
    overrides.profileImage ??
    normalizeProfileImage(payload.profileImage ?? existingTenant?.profileImage ?? {});
  const members = normalizeMembers(payload.members ?? existingTenant?.members ?? []);

  const payments = payload.payments
    ? payload.payments
    : generatePayments(startDate, rentAmount, existingTenant?.payments || []);

  return {
    roomNo,
    residentType,
    name,
    phoneNo,
    occupation,
    aadharCard,
    rentAmount,
    startDate,
    vacateDate: vacateDate || undefined,
    status,
    profileImage,
    members,
    payments,
  };
};

const resolveProfileImage = async (payload, existingTenant) => {
  const currentProfileImage = normalizeProfileImage(existingTenant?.profileImage);
  const imageData = typeof payload.imageData === 'string' ? payload.imageData.trim() : '';
  const removeProfileImage =
    payload.removeProfileImage === true || payload.removeProfileImage === 'true';

  if (imageData) {
    const uploadedImage = await uploadTenantImage(imageData);

    if (
      currentProfileImage.public_id &&
      currentProfileImage.public_id !== uploadedImage.public_id
    ) {
      try {
        await destroyCloudinaryImage(currentProfileImage.public_id);
      } catch (error) {
        console.error(
          `Failed to delete previous tenant image ${currentProfileImage.public_id}: ${error.message}`
        );
      }
    }

    return uploadedImage;
  }

  if (removeProfileImage) {
    if (currentProfileImage.public_id) {
      await destroyCloudinaryImage(currentProfileImage.public_id);
    }

    return {};
  }

  return normalizeProfileImage(payload.profileImage ?? currentProfileImage);
};

// @desc    Get all tenants
// @route   GET /api/tenants
// @access  Public
const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    await Promise.all(tenants.map((tenant) => syncTenantPayments(tenant)));
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

    await syncTenantPayments(tenant);
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
  try {
    const profileImage = await resolveProfileImage(req.body);
    const newTenant = new Tenant(buildTenantPayload(req.body, null, { profileImage }));

    const tenant = await newTenant.save();
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
};

// @desc    Update a tenant
// @route   PUT /api/tenants/:id
// @access  Public
const updateTenant = async (req, res) => {
  try {
    const existingTenant = await Tenant.findById(req.params.id);

    if (!existingTenant) return res.status(404).json({ msg: 'Tenant not found' });

    const profileImage = await resolveProfileImage(req.body, existingTenant);
    const tenantFields = buildTenantPayload(req.body, existingTenant, { profileImage });

    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { $set: tenantFields },
      { new: true }
    );

    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message || 'Server Error' });
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

    if (tenant.profileImage?.public_id) {
      await destroyCloudinaryImage(tenant.profileImage.public_id);
    }

    await tenant.deleteOne();

    res.json({ msg: 'Tenant removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Tenant not found' });
    }
    res.status(500).json({ msg: err.message || 'Server Error' });
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

module.exports = {
  getTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
  markPaymentAsPaid,
  markPaymentAsUnpaid,
};
