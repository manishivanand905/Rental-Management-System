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
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadowHover};
  border: 1px solid ${({ theme }) => theme.border};
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-width: 95%;
    margin: 0 auto;
  }
`;

export const ModalHeader = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalActions = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.error};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ type, theme }) => {
    switch (type) {
      case "primary":
        return `
          background: ${theme.primary};
          color: white;
          &:hover {
            background: ${theme.primaryHover};
          }
        `;
      case "secondary":
        return `
          background: ${theme.inputBackground};
          color: ${theme.text};
          border: 1px solid ${theme.border};
          &:hover {
            background: ${theme.border};
          }
        `;
      case "error":
        return `
          background: ${theme.error};
          color: white;
          &:hover {
            background: ${theme.errorHover};
          }
        `;
      default:
        return `
          background: ${theme.primary};
          color: white;
          &:hover {
            background: ${theme.primaryHover};
          }
        `;
    }
  }}

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
  }
`;

export const DeleteMessage = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;
