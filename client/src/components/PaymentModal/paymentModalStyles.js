import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.modalOverlay};
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadowHover};
  border: 1px solid ${({ theme }) => theme.border};
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const ModalActions = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ type, theme }) => {
    switch (type) {
      case "primary":
        return `
          background: ${theme.primary};
          color: white;
          border-color: ${theme.primary};
          &:hover {
            background: ${theme.primaryHover};
            border-color: ${theme.primaryHover};
          }
        `;
      case "secondary":
        return `
          background: ${theme.cardBackground};
          color: ${theme.text};
          border-color: ${theme.border};
          &:hover {
            background: ${theme.inputBackground};
          }
        `;
      case "error":
        return `
          background: ${theme.error};
          color: white;
          border-color: ${theme.error};
          &:hover {
            background: ${theme.errorHover};
            border-color: ${theme.errorHover};
          }
        `;
      default:
        return `
          background: ${theme.primary};
          color: white;
          border-color: ${theme.primary};
          &:hover {
            background: ${theme.primaryHover};
            border-color: ${theme.primaryHover};
          }
        `;
    }
  }}
`;

export const PaymentTable = styled.div`
  overflow-x: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const PaymentHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr;
  background: ${({ theme }) => theme.inputBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0.75rem 0;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    display: none; /* Hide header on small screens */
  }
`;

export const PaymentRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block; /* Stack items vertically */
    margin-bottom: 1rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    padding: 0.75rem;
  }
`;

export const PaymentCell = styled.div`
  padding: 0.75rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px dashed ${({ theme }) => theme.border};

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: attr(data-label) ":";
      font-weight: 600;
      color: ${({ theme }) => theme.textSecondary};
      margin-right: 0.5rem;
    }
  }
`;

export const PaymentStatus = styled.span`
  background: ${({ theme, status }) =>
    status === "Paid" ? theme.success : theme.error};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
`;

export const PaymentActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const PaymentButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.2s ease-in-out;
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};

  &:hover {
    background: ${({ theme }) => theme.inputBackground};
    color: ${({ theme, color }) => {
      switch (color) {
        case "success":
          return theme.success;
        case "error":
          return theme.error;
        default:
          return theme.text;
      }
    }};
  }
`;
