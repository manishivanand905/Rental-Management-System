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
  max-width: 600px; /* Default max-width */
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 95%; /* More flexible max-width for small screens */
    margin: 0 1rem; /* Add some horizontal margin */
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    max-width: 98%; /* Even more flexible for extra small screens */
    margin: 0 0.5rem;
  }
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
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem; /* Reduced padding for small screens */
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0.8rem; /* Further reduced padding for extra small screens */
  }
`;

export const ModalActions = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.error};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}40;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr; /* Single column on small screens */
  }
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

export const DeleteMessage = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
`;