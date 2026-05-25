import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCheck,
  faXmark,
  faRotateLeft,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import {
  ActionButton,
  ActionRow,
  CloseButton,
  MetricCard,
  MetricGrid,
  Modal,
  ModalActions,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  PaymentCard,
  PaymentGrid,
  PaymentMeta,
  PaymentStatus,
  PaymentTitle,
} from "./paymentModalStyles";
import {
  formatCurrency,
  formatDisplayDate,
  getTenantPaymentState,
} from "../../utils/tenantInsights";

const PaymentModal = ({ tenant, onClose, onMarkPaid, onMarkUnpaid }) => {
  const paymentState = getTenantPaymentState(tenant);
  const today = new Date();
  const payments = (tenant.payments || [])
    .slice()
    .sort((left, right) => new Date(left.dueDate) - new Date(right.dueDate));

  const totalPaid = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  const totalPending = payments
    .filter((payment) => payment.status !== "Paid" && new Date(payment.dueDate) <= today)
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  return (
    <Modal>
      <ModalOverlay onClick={onClose} />
      <ModalContent id="payments">
        <ModalHeader>
          <CloseButton type="button" onClick={onClose} aria-label="Close payments">
            <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
          <div>
              <ModalTitle>
                Payments - {tenant.name} - Room {tenant.roomNo}
              </ModalTitle>
            <PaymentMeta>{paymentState.detail}</PaymentMeta>
          </div>
        </ModalHeader>

        <ModalBody>
          <MetricGrid>
            <MetricCard>
              <span>Collected</span>
              <strong>Rs. {formatCurrency(totalPaid)}</strong>
            </MetricCard>
            <MetricCard>
              <span>Pending</span>
              <strong>Rs. {formatCurrency(totalPending)}</strong>
            </MetricCard>
            <MetricCard>
              <span>Next due</span>
              <strong>{paymentState.dueDate ? formatDisplayDate(paymentState.dueDate) : "Not set"}</strong>
            </MetricCard>
          </MetricGrid>

          <PaymentGrid>
            {payments.map((payment, index) => (
              <PaymentCard
                key={payment._id}
                as={motion.article}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.03 }}
              >
                <div>
                  <PaymentTitle>{payment.month}</PaymentTitle>
                  <PaymentMeta>
                    <FontAwesomeIcon icon={faCalendarDay} />
                    Due {formatDisplayDate(payment.dueDate)}
                  </PaymentMeta>
                  <PaymentMeta>
                    <FontAwesomeIcon icon={faWallet} />
                    Rs. {formatCurrency(payment.amount)}
                  </PaymentMeta>
                </div>

                <div>
                  <PaymentStatus status={payment.status}>{payment.status}</PaymentStatus>
                  <PaymentMeta>
                    {payment.paidDate
                      ? `Paid on ${formatDisplayDate(payment.paidDate)}`
                      : "Not cleared yet"}
                  </PaymentMeta>
                </div>

                <ActionRow>
                  {payment.status === "Paid" ? (
                    <ActionButton type="button" $tone="ghost" onClick={() => onMarkUnpaid(tenant._id, payment._id)}>
                      <FontAwesomeIcon icon={faRotateLeft} />
                      Mark unpaid
                    </ActionButton>
                  ) : (
                    <ActionButton type="button" $tone="primary" onClick={() => onMarkPaid(tenant._id, payment._id)}>
                      <FontAwesomeIcon icon={faCheck} />
                      Mark paid
                    </ActionButton>
                  )}
                </ActionRow>
              </PaymentCard>
            ))}
          </PaymentGrid>
        </ModalBody>

        <ModalActions>
          <ActionButton type="button" $tone="ghost" onClick={onClose}>
            Close
          </ActionButton>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
