import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faDollarSign,
  faEdit,
  faTrash,
  faHome,
  faPhone,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import TenantForm from "../TenantForm/tenantForm";
import PaymentModal from "../PaymentModal/paymentModal";
import DeleteConfirmation from "../DeleteConfirmation/delete";
import {
  TenantContainer,
  TenantHeader,
  TenantTitle,
  AddButton,
  CardsContainer,
  TenantCard,
  CardHeader,
  RoomNumber,
  StatusBadge,
  TenantName,
  CardDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  RentAmount,
  RentLabel,
  RentValue,
  ActionButton,
  ActionGroup,
  EmptyState,
  PhoneNumber,
} from "./tenantManagementStyles";

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
  const selectedTenant = tenants.find((t) => t._id === selectedTenantId);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
  };

  const handleDelete = (tenant) => {
    setTenantToDelete(tenant);
    setShowDeleteConfirm(true);
  };

  const handlePayments = (tenant) => {
    setSelectedTenantId(tenant._id);
    setShowPaymentModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPhoneNumber = (phoneNo) => {
    if (phoneNo.length === 10) {
      return `+91 ${phoneNo.slice(0, 5)} ${phoneNo.slice(5)}`;
    }
    return phoneNo;
  };

  return (
    <TenantContainer>
      <TenantHeader>
        <TenantTitle>Tenant Details</TenantTitle>
        <AddButton onClick={() => setShowTenantForm(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Add Tenant
        </AddButton>
      </TenantHeader>

      {tenants.length === 0 ? (
        <EmptyState>
          No tenants added yet. Click "Add Tenant" to get started!
        </EmptyState>
      ) : (
        <CardsContainer>
          {tenants
            .slice() // Create a shallow copy to avoid modifying the original prop
            .sort((a, b) => a.roomNo - b.roomNo) // Sort by roomNo in ascending order
            .map((tenant) => (
              <TenantCard key={tenant._id}>
                <CardHeader>
                  <RoomNumber>
                    <FontAwesomeIcon icon={faHome} />
                    Room {tenant.roomNo}
                  </RoomNumber>
                  <StatusBadge status={tenant.status}>
                    {tenant.status}
                  </StatusBadge>
                </CardHeader>

              <TenantName>{tenant.name}</TenantName>

              <CardDetails>
                <DetailItem>
                  <DetailLabel>
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{ marginRight: "0.3rem" }}
                    />
                    Phone Number
                  </DetailLabel>
                  <DetailValue>
                    <PhoneNumber href={`tel:${tenant.phoneNo}`}>
                      {formatPhoneNumber(tenant.phoneNo)}
                    </PhoneNumber>
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ marginRight: "0.3rem" }}
                    />
                    Start Date
                  </DetailLabel>
                  <DetailValue>{formatDate(tenant.startDate)}</DetailValue>
                </DetailItem>
              </CardDetails>

              <RentAmount>
                <RentLabel>Monthly Rent</RentLabel>
                <RentValue>₹{tenant.rentAmount.toLocaleString()}</RentValue>
              </RentAmount>

              <ActionGroup>
                <ActionButton
                  color="primary"
                  onClick={() => handlePayments(tenant)}
                  title="View Payments"
                >
                  <FontAwesomeIcon icon={faDollarSign} />
                </ActionButton>
                <ActionButton
                  color="warning"
                  onClick={() => handleEdit(tenant)}
                  title="Edit Tenant"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </ActionButton>
                <ActionButton
                  color="error"
                  onClick={() => handleDelete(tenant)}
                  title="Delete Tenant"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </ActionButton>
              </ActionGroup>
            </TenantCard>
          ))}
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
