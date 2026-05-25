import React, { useDeferredValue, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPenToSquare,
  faPhone,
  faPlus,
  faCommentDots,
  faTrash,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import TenantForm from "../TenantForm/tenantForm";
import PaymentModal from "../PaymentModal/paymentModal";
import DeleteConfirmation from "../DeleteConfirmation/delete";
import {
  AddButton,
  BadgePill,
  CardBody,
  CardMeta,
  CardsContainer,
  EmptyState,
  FilterBar,
  FilterButton,
  FilterInput,
  InfoCluster,
  MemberChip,
  ProfileAvatar,
  ProfileMeta,
  QuickAction,
  QuickActions,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
  StatusBadge,
  TenantCard,
  TenantContainer,
  TenantTop,
  TertiaryStat,
  ValueLine,
} from "./tenantManagementStyles";
import {
  formatCurrency,
  formatDisplayDate,
  formatPhoneNumber,
  getTenantMonthlyStatus,
  getTenantPaymentState,
} from "../../utils/tenantInsights";

const filters = ["All", "Active", "Due today", "Overdue", "Upcoming"];

const getWhatsAppLink = (tenant, paymentState) => {
  const phoneDigits = String(tenant.phoneNo || "").replace(/\D/g, "");
  const formattedPhone =
    phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;
  const dueDateText = paymentState.dueDate
    ? formatDisplayDate(paymentState.dueDate)
    : "This month";
  const amountText = `Rs. ${formatCurrency(paymentState.amount || tenant.rentAmount)}`;
  const message = [
    "Hi, this is Ravinder.",
    "",
    "Requesting you the room rent for this month.",
    "",
    `Room number: ${tenant.roomNo}`,
    `Due date: ${dueDateText}`,
    `Amount: ${amountText}`,
    "",
    "Please pay the rent.",
    "Thank you.",
  ].join("\n");

  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};

const TenantManagement = ({
  tenants,
  showTenantForm,
  setShowTenantForm,
  editingTenant,
  setEditingTenant,
  showDeleteConfirm,
  setShowDeleteConfirm,
  tenantToDelete,
  setTenantToDelete,
  addTenant,
  updateTenant,
  deleteTenant,
  markPaymentAsPaid,
  markPaymentAsUnpaid,
}) => {
  const [selectedTenantId, setSelectedTenantId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const selectedTenant = tenants.find((tenant) => tenant._id === selectedTenantId);

  const filteredTenants = tenants
    .slice()
    .sort((left, right) => String(left.roomNo).localeCompare(String(right.roomNo), undefined, { numeric: true }))
    .filter((tenant) => {
      const searchTarget = `${tenant.roomNo} ${tenant.name} ${tenant.phoneNo} ${tenant.occupation || ""}`.toLowerCase();
      const matchesQuery = searchTarget.includes(deferredQuery.trim().toLowerCase());
      const paymentState = getTenantPaymentState(tenant);

      if (!matchesQuery) {
        return false;
      }

      if (activeFilter === "Active") {
        return tenant.status === "Active";
      }

      if (activeFilter === "Due today") {
        return paymentState.label === "Due today";
      }

      if (activeFilter === "Overdue") {
        return paymentState.label === "Overdue";
      }

      if (activeFilter === "Upcoming") {
        return paymentState.label === "Upcoming";
      }

      return true;
    });

  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    setShowTenantForm(false);
  };

  const handleDelete = (tenant) => {
    setTenantToDelete(tenant);
    setShowDeleteConfirm(true);
  };

  const handlePayments = (tenant) => {
    setSelectedTenantId(tenant._id);
    setShowPaymentModal(true);
  };

  return (
    <TenantContainer id="tenants">
      <SectionHeader>
        <div>
          <SectionEyebrow>Tenants</SectionEyebrow>
          <SectionTitle>Tenant details</SectionTitle>
        </div>
        <AddButton onClick={() => setShowTenantForm(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Add Tenant
        </AddButton>
      </SectionHeader>

      <FilterBar>
        <FilterInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by room, name, phone, or workplace"
        />
        <InfoCluster>
          <BadgePill>
            <FontAwesomeIcon icon={faFilter} />
            {filteredTenants.length} visible
          </BadgePill>
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              type="button"
              $active={filter === activeFilter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </InfoCluster>
      </FilterBar>

      {filteredTenants.length === 0 ? (
        <EmptyState>
          <h3>No matching tenants</h3>
          <p>Try a different filter or add a tenant.</p>
        </EmptyState>
      ) : (
        <CardsContainer>
          {filteredTenants.map((tenant, index) => {
            const paymentState = getTenantPaymentState(tenant);
            const monthlyStatus = getTenantMonthlyStatus(tenant);
            const initials = tenant.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <TenantCard
                key={tenant._id}
                as={motion.article}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                tone={monthlyStatus.tone}
              >
                <TenantTop>
                  <ProfileAvatar>
                    {tenant.profileImage?.url ? (
                      <img src={tenant.profileImage.url} alt={tenant.name} />
                    ) : (
                      initials
                    )}
                  </ProfileAvatar>

                  <ProfileMeta>
                    <BadgePill>Room {tenant.roomNo}</BadgePill>
                    <h3>{tenant.name}</h3>
                    <CardMeta>{tenant.occupation || "No occupation"}</CardMeta>
                  </ProfileMeta>

                  <StatusBadge tone={monthlyStatus.tone}>{monthlyStatus.label}</StatusBadge>
                </TenantTop>

                <CardBody>
                  <ValueLine>
                    <span>Monthly rent</span>
                    <strong>Rs. {formatCurrency(tenant.rentAmount)}</strong>
                  </ValueLine>
                  <ValueLine>
                    <span>Next due</span>
                    <strong>
                      {paymentState.dueDate ? formatDisplayDate(paymentState.dueDate) : "Not generated"}
                    </strong>
                  </ValueLine>
                  <ValueLine>
                    <span>Phone</span>
                    <strong>{formatPhoneNumber(tenant.phoneNo)}</strong>
                  </ValueLine>
                  <ValueLine>
                    <span>Joined</span>
                    <strong>{formatDisplayDate(tenant.startDate)}</strong>
                  </ValueLine>

                  <TertiaryStat>
                    <span>{monthlyStatus.detail}</span>
                    <span>{tenant.status}</span>
                  </TertiaryStat>

                  <InfoCluster>
                    {(tenant.members || []).length > 0 ? (
                      tenant.members.map((member) => (
                        <MemberChip key={`${tenant._id}-${member.name}-${member.aadhaarNo}`}>
                          {member.name}
                        </MemberChip>
                      ))
                    ) : (
                      <MemberChip>Single occupant</MemberChip>
                    )}
                  </InfoCluster>
                </CardBody>

                <QuickActions>
                  <QuickAction onClick={() => handlePayments(tenant)} $tone="payments">
                    <FontAwesomeIcon icon={faWallet} />
                    Payments
                  </QuickAction>
                  <QuickAction onClick={() => handleEdit(tenant)} $tone="edit">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                  </QuickAction>
                  <QuickAction
                    as="a"
                    href={getWhatsAppLink(tenant, paymentState)}
                    target="_blank"
                    rel="noreferrer"
                    $tone="whatsapp"
                  >
                    <FontAwesomeIcon icon={faCommentDots} />
                    WhatsApp
                  </QuickAction>
                  <QuickAction as="a" href={`tel:${tenant.phoneNo}`} $tone="call">
                    <FontAwesomeIcon icon={faPhone} />
                    Call
                  </QuickAction>
                  <QuickAction onClick={() => handleDelete(tenant)} $tone="delete">
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </QuickAction>
                </QuickActions>
              </TenantCard>
            );
          })}
        </CardsContainer>
      )}

      {(showTenantForm || editingTenant) && (
        <TenantForm
          tenant={editingTenant}
          onSave={editingTenant ? updateTenant : addTenant}
          onCancel={() => {
            setShowTenantForm(false);
            setEditingTenant(null);
          }}
        />
      )}

      {showPaymentModal && selectedTenant && (
        <PaymentModal
          tenant={selectedTenant}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedTenantId(null);
          }}
          onMarkPaid={markPaymentAsPaid}
          onMarkUnpaid={markPaymentAsUnpaid}
        />
      )}

      {showDeleteConfirm && tenantToDelete && (
        <DeleteConfirmation
          tenant={tenantToDelete}
          onConfirm={() => deleteTenant(tenantToDelete._id)}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setTenantToDelete(null);
          }}
        />
      )}
    </TenantContainer>
  );
};

export default TenantManagement;
