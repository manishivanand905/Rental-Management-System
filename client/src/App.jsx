import React, { startTransition, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faBolt,
  faBuildingShield,
  faChartLine,
  faHome,
  faPlus,
  faUserGroup,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import Header from "./components/Header/header";
import Dashboard from "./components/Dashboard/dashboard";
import TenantManagement from "./components/TenantManagement/tenantManagement";
import {
  createTenant as createTenantAPI,
  deleteTenant as deleteTenantAPI,
  getTenants as getTenantsAPI,
  markPaymentAsPaid as markPaymentAsPaidAPI,
  markPaymentAsUnpaid as markPaymentAsUnpaidAPI,
  updateTenant as updateTenantAPI,
} from "./services/tenantService";
import { formatCurrency, getDashboardInsights } from "./utils/tenantInsights";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [tenants, setTenants] = useState([]);
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const insights = getDashboardInsights(tenants);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const jumpToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getTenants = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getTenantsAPI();
      startTransition(() => {
        setTenants(response.data);
      });
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTenants();
  }, []);

  const addTenant = async (tenantData) => {
    try {
      const response = await createTenantAPI(tenantData);
      startTransition(() => {
        setTenants((current) => [...current, response.data]);
      });
      setShowTenantForm(false);
    } catch (requestError) {
      console.error(requestError);
      setError(requestError.response?.data?.msg || "Tenant could not be created. Please try again.");
    }
  };

  const updateTenant = async (updatedTenant) => {
    try {
      const response = await updateTenantAPI(updatedTenant._id, updatedTenant);
      startTransition(() => {
        setTenants((current) =>
          current.map((tenant) => (tenant._id === response.data._id ? response.data : tenant))
        );
      });
      setEditingTenant(null);
    } catch (requestError) {
      console.error(requestError);
      setError(requestError.response?.data?.msg || "Tenant changes could not be saved.");
    }
  };

  const deleteTenant = async (id) => {
    try {
      await deleteTenantAPI(id);
      startTransition(() => {
        setTenants((current) => current.filter((tenant) => tenant._id !== id));
      });
      setShowDeleteConfirm(false);
      setTenantToDelete(null);
    } catch (requestError) {
      console.error(requestError);
      setError(requestError.response?.data?.msg || "Delete failed. Please retry.");
    }
  };

  const markPaymentAsPaid = async (tenantId, paymentId) => {
    try {
      const response = await markPaymentAsPaidAPI(tenantId, paymentId);
      startTransition(() => {
        setTenants((current) =>
          current.map((tenant) => (tenant._id === response.data._id ? response.data : tenant))
        );
      });
    } catch (requestError) {
      console.error(requestError);
      setError("Payment status could not be updated.");
    }
  };

  const markPaymentAsUnpaid = async (tenantId, paymentId) => {
    try {
      const response = await markPaymentAsUnpaidAPI(tenantId, paymentId);
      startTransition(() => {
        setTenants((current) =>
          current.map((tenant) => (tenant._id === response.data._id ? response.data : tenant))
        );
      });
    } catch (requestError) {
      console.error(requestError);
      setError("Payment status could not be reverted.");
    }
  };

  const heroStats = [
    {
      label: "Expected rent",
      value: `Rs. ${formatCurrency(insights.monthlyExpected)}`,
      icon: faWallet,
    },
    {
      label: "Collected",
      value: `${insights.collectionRate}%`,
      icon: faChartLine,
    },
    {
      label: "Rooms",
      value: insights.occupiedRooms,
      icon: faHome,
    },
    {
      label: "Tenants",
      value: insights.activeTenants,
      icon: faUserGroup,
    },
  ];

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppShell>
        <Header theme={theme} toggleTheme={toggleTheme} onJump={jumpToSection} />

        <MainContent>
          <HeroSection
            as={motion.section}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <HeroCopy>
              <HeroEyebrow>
                <FontAwesomeIcon icon={faBuildingShield} />
                Rental management
              </HeroEyebrow>
              <HeroTitle>Manage tenants and payments.</HeroTitle>
              <HeroText>Track rent, due dates, and tenant details.</HeroText>
              <HeroActions>
                <PrimaryButton type="button" onClick={() => setShowTenantForm(true)}>
                  <FontAwesomeIcon icon={faPlus} />
                  Add tenant
                </PrimaryButton>
                <SecondaryButton type="button" onClick={() => jumpToSection("tenants")}>
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                  View tenants
                </SecondaryButton>
              </HeroActions>
            </HeroCopy>

            <HeroPanel>
              <PanelTag>
                <FontAwesomeIcon icon={faBolt} />
                Overview
              </PanelTag>
              <PanelMetric>{insights.collectionRate}%</PanelMetric>
              <PanelText>
                {insights.dueTodayCount} due today - Rs. {formatCurrency(insights.overdueAmount)} overdue
              </PanelText>
              <HeroMetricGrid>
                {heroStats.map((stat) => (
                  <HeroMetricCard key={stat.label}>
                    <FontAwesomeIcon icon={stat.icon} />
                    <div>
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  </HeroMetricCard>
                ))}
              </HeroMetricGrid>
            </HeroPanel>
          </HeroSection>

          {error && <ErrorBanner>{error}</ErrorBanner>}
          {loading ? <LoadingCard>Loading data...</LoadingCard> : <Dashboard tenants={tenants} />}

          {!loading && (
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
          )}
        </MainContent>

        <BottomDock>
          <DockButton type="button" onClick={() => jumpToSection("overview")}>
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </DockButton>
          <DockButton type="button" onClick={() => jumpToSection("tenants")}>
            <FontAwesomeIcon icon={faUserGroup} />
            Tenants
          </DockButton>
          <DockButton type="button" onClick={() => setShowTenantForm(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Add
          </DockButton>
          <DockButton type="button" onClick={() => jumpToSection("overview")}>
            <FontAwesomeIcon icon={faWallet} />
            Payments
          </DockButton>
          <DockButton type="button" onClick={toggleTheme}>
            <FontAwesomeIcon icon={faChartLine} />
            Theme
          </DockButton>
        </BottomDock>
      </AppShell>
    </ThemeProvider>
  );
};

const AppShell = styled.div`
  min-height: 100vh;
  padding-bottom: 6rem;
`;

const MainContent = styled.main`
  width: min(1320px, calc(100% - 2rem));
  margin: 0 auto 2rem;
  display: grid;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(100%, calc(100% - 1rem));
    gap: 1rem;
  }
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    radial-gradient(circle at top left, rgba(99, 102, 241, 0.22), transparent 28%),
    radial-gradient(circle at bottom right, rgba(6, 182, 212, 0.18), transparent 32%),
    ${({ theme }) => theme.cardBackgroundStrong};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  box-shadow: ${({ theme }) => theme.shadows.strong};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 1.1rem;
    gap: 0.85rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 1rem;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

const HeroCopy = styled.div`
  display: grid;
  align-content: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.75rem;
  }
`;

const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  width: fit-content;
  padding: 0.72rem 0.95rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.infoSoft};
  color: ${({ theme }) => theme.accent};
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.5rem 0.72rem;
    font-size: 0.68rem;
  }
`;

const HeroTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.08;
  color: ${({ theme }) => theme.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.65rem, 8vw, 2.15rem);
    max-width: 16rem;
  }
`;

const HeroText = styled.p`
  max-width: 42rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.8;
  font-size: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.88rem;
    line-height: 1.5;
    max-width: none;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.55rem;
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.95rem 1.2rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.gradients.hero};
  color: #ffffff;
  font-weight: 700;
  box-shadow: ${({ theme }) => theme.shadows.glow};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.78rem 1rem;
    font-size: 0.88rem;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.border};
`;

const HeroPanel = styled.aside`
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const PanelTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.successSoft};
  color: ${({ theme }) => theme.success};
  font-size: 0.82rem;
  font-weight: 800;
`;

const PanelMetric = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: clamp(3rem, 6vw, 4.8rem);
  line-height: 1;
  color: ${({ theme }) => theme.text};
`;

const PanelText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

const HeroMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    grid-template-columns: 1fr;
  }
`;

const HeroMetricCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: center;
  padding: 0.9rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};

  svg {
    color: ${({ theme }) => theme.accent};
    font-size: 1.1rem;
  }

  span {
    display: block;
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
  }

  strong {
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
  }
`;

const LoadingCard = styled.div`
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.cardBackgroundStrong};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  color: ${({ theme }) => theme.textSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.1rem;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

const ErrorBanner = styled.div`
  padding: 1rem 1.2rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.errorSoft};
  border: 1px solid ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.85rem 0.95rem;
    font-size: 0.9rem;
  }
`;

const BottomDock = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  z-index: 45;
  display: none;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.35rem;
  width: min(96vw, 680px);
  padding: 0.55rem;
  border-radius: 26px;
  background: ${({ theme }) => theme.headerBackground};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  backdrop-filter: blur(18px);
  box-shadow: ${({ theme }) => theme.shadows.strong};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    width: min(97vw, 520px);
    bottom: 0.65rem;
    padding: 0.4rem;
    border-radius: 22px;
  }
`;

const DockButton = styled.button`
  display: grid;
  justify-items: center;
  gap: 0.38rem;
  padding: 0.7rem 0.35rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.72rem;
  font-weight: 700;

  svg {
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0.58rem 0.2rem;
    font-size: 0.62rem;

    svg {
      font-size: 0.92rem;
    }
  }
`;

export default App;
