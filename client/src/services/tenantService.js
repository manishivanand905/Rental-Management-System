import api from './api';

export const getTenants = () => api.get('/tenants');

export const getTenantById = (id) => api.get(`/tenants/${id}`);

export const createTenant = (tenantData) => api.post('/tenants', tenantData);

export const updateTenant = (id, tenantData) =>
  api.put(`/tenants/${id}`, tenantData);

export const deleteTenant = (id) => api.delete(`/tenants/${id}`);

export const markPaymentAsPaid = (tenantId, paymentId) =>
  api.put(`/tenants/${tenantId}/payments/${paymentId}/paid`);

export const markPaymentAsUnpaid = (tenantId, paymentId) =>
  api.put(`/tenants/${tenantId}/payments/${paymentId}/unpaid`);
