const express = require('express');
const router = express.Router();
const {
  getTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
  markPaymentAsPaid,
  markPaymentAsUnpaid,
} = require('../controllers/tenantController');

router.route('/').get(getTenants).post(createTenant);
router.route('/:id').get(getTenantById).put(updateTenant).delete(deleteTenant);
router.route('/:tenantId/payments/:paymentId/paid').put(markPaymentAsPaid);
router.route('/:tenantId/payments/:paymentId/unpaid').put(markPaymentAsUnpaid);

module.exports = router;