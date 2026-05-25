import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 82;
  display: grid;
  place-items: center;
  padding: 1rem;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.modalOverlay};
  backdrop-filter: blur(12px);
`;

export const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  width: min(420px, 100%);
  max-height: 92vh;
  overflow: auto;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.cardBackgroundStrong};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  box-shadow: ${({ theme }) => theme.shadows.strong};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalHeader = styled.div`
  padding: 1.4rem 1.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const ModalTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
`;

export const ModalBody = styled.div`
  padding: 1.25rem 1.5rem;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1.5rem 1.4rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Button = styled.button`
  padding: 0.9rem 1.15rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 700;
  border: 1px solid transparent;

  ${({ type, theme }) => {
    if (type === "secondary") {
      return `
        background: ${theme.surface};
        color: ${theme.text};
        border-color: ${theme.border};
      `;
    }

    return `
      background: ${theme.gradients.warm};
      color: #ffffff;
      box-shadow: ${theme.shadows.soft};
    `;
  }}
`;

export const DeleteMessage = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
`;
