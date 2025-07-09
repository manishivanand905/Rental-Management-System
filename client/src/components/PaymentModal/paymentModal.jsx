import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalActions,
  Button,
  PaymentTable,
  PaymentHeader,
  PaymentRow,
  PaymentCell,
  PaymentStatus,
  PaymentActions,
  PaymentButton,
} from "./paymentModalStyles";

const PaymentModal = ({ tenant, onClose, onMarkPaid, onMarkUnpaid }) => {
  const handleMarkPaid = (paymentId) => {
    onMarkPaid(tenant._id, paymentId);
  };

  const handleMarkUnpaid = (paymentId) => {
    onMarkUnpaid(tenant._id, paymentId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Modal>
      <ModalOverlay onClick={onClose} />
      <ModalContent className="scale-in" style={{ maxWidth: "800px" }}>
        <ModalHeader>
          <ModalTitle>
            Rent Payments for {tenant.name} (Room No: {tenant.roomNo})
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <PaymentTable>
            <PaymentHeader>
              <PaymentCell>Month/Year</PaymentCell>
              <PaymentCell>Due Date</PaymentCell>
              <PaymentCell>Amount</PaymentCell>
              <PaymentCell>Status</PaymentCell>
              <PaymentCell>Paid Date</PaymentCell>
              <PaymentCell>Actions</PaymentCell>
            </PaymentHeader>

            {tenant.payments
            .filter((payment) => new Date(payment.dueDate) < new Date())
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) // Sort by oldest first
            .map((payment) => (
              <PaymentRow key={payment._id}>
                <PaymentCell>{payment.month}</PaymentCell>
                <PaymentCell>{formatDate(payment.dueDate)}</PaymentCell>
                <PaymentCell>₹{payment.amount.toLocaleString()}</PaymentCell>
                <PaymentCell>
                  <PaymentStatus status={payment.status}>
                    {payment.status}
                  </PaymentStatus>
                </PaymentCell>
                <PaymentCell>{formatDate(payment.paidDate)}</PaymentCell>
                <PaymentCell>
                  <PaymentActions>
                    {payment.status === "Unpaid" ? (
                      <PaymentButton
                        color="success"
                        onClick={() => handleMarkPaid(payment._id)}
                        title="Mark as Paid"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </PaymentButton>
                    ) : (
                      <PaymentButton
                        color="error"
                        onClick={() => handleMarkUnpaid(payment._id)}
                        title="Mark as Unpaid"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </PaymentButton>
                    )}
                  </PaymentActions>
                </PaymentCell>
              </PaymentRow>
            ))}
          </PaymentTable>
        </ModalBody>

        <ModalActions>
          <Button type="secondary" onClick={onClose}>
            Close
          </Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
