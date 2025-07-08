import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import Header from "./components/Header/header";
import Dashboard from "./components/Dashboard/dashboard";
import TenantManagement from "./components/TenantManagement/tenantManagement";
import {
  getTenants as getTenantsAPI,
  createTenant as createTenantAPI,
  updateTenant as updateTenantAPI,
  deleteTenant as deleteTenantAPI,
  markPaymentAsPaid as markPaymentAsPaidAPI,
  markPaymentAsUnpaid as markPaymentAsUnpaidAPI,
} from "./services/tenantService";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [tenants, setTenants] = useState([]);
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getTenants = async () => {
    try {
      const res = await getTenantsAPI();
      setTenants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTenants();
  }, []);

  const addTenant = async (tenantData) => {
    try {
      const res = await createTenantAPI(tenantData);
      setTenants([...tenants, res.data]);
      setShowTenantForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTenant = async (updatedTenant) => {
    try {
      const res = await updateTenantAPI(updatedTenant._id, updatedTenant);
      setTenants(
        tenants.map((tenant) =>
          tenant._id === res.data._id ? res.data : tenant
        )
      );
      setEditingTenant(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTenant = async (id) => {
    try {
      await deleteTenantAPI(id);
      setTenants(tenants.filter((tenant) => tenant._id !== id));
      setShowDeleteConfirm(false);
      setTenantToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  const markPaymentAsPaid = async (tenantId, paymentId) => {
    try {
      const res = await markPaymentAsPaidAPI(tenantId, paymentId);
      setTenants(
        tenants.map((tenant) =>
          tenant._id === res.data._id ? res.data : tenant
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markPaymentAsUnpaid = async (tenantId, paymentId) => {
    try {
      const res = await markPaymentAsUnpaidAPI(tenantId, paymentId);
      setTenants(
        tenants.map((tenant) =>
          tenant._id === res.data._id ? res.data : tenant
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        userId="066776219588029948038"
      />
      <Dashboard tenants={tenants} />
      <TenantManagement
        tenants={tenants}
        showTenantForm={showTenantForm}
        setShowTenantForm={setShowTenantForm}
        editingTenant={editingTenant}
        setEditingTenant={setEditingTenant}
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        tenantToDelete={tenantToDelete}
        setTenantToDelete={setTenantToDelete}
        addTenant={addTenant}
        updateTenant={updateTenant}
        deleteTenant={deleteTenant}
        markPaymentAsPaid={markPaymentAsPaid}
        markPaymentAsUnpaid={markPaymentAsUnpaid}
      />
    </ThemeProvider>
  );
};

export default App;
