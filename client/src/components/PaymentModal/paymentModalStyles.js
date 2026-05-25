import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
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
  width: min(1040px, 100%);
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
  position: relative;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const ModalTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  color: ${({ theme }) => theme.text};
  font-size: 1.35rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  svg {
    font-size: 1rem;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalActions = styled.div`
  padding: 1rem 1.5rem 1.4rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};

  span {
    display: block;
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  strong {
    color: ${({ theme }) => theme.text};
    font-family: "Poppins", sans-serif;
    font-size: 1.35rem;
  }
`;

export const PaymentGrid = styled.div`
  display: grid;
  gap: 0.7rem;
`;

export const PaymentCard = styled.article`
  display: grid;
  grid-template-columns: 1.2fr 0.85fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.8rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const PaymentTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 0.96rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
`;

export const PaymentMeta = styled.p`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
  line-height: 1.4;

  & + & {
    margin-top: 0.25rem;
  }
`;

export const PaymentStatus = styled.span`
  display: inline-flex;
  margin-bottom: 0.38rem;
  padding: 0.45rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ status, theme }) => (status === "Paid" ? theme.successSoft : theme.warningSoft)};
  color: ${({ status, theme }) => (status === "Paid" ? theme.success : theme.warning)};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 800;
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 2.5rem;
  padding: 0.72rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 700;
  font-size: 0.86rem;
  border: 1px solid transparent;

  ${({ $tone, theme }) => {
    if ($tone === "ghost") {
      return `
        background: ${theme.surface};
        color: ${theme.text};
        border-color: ${theme.border};
      `;
    }

    return `
      background: ${theme.gradients.hero};
      color: #ffffff;
      box-shadow: ${theme.shadows.glow};
    `;
  }}
`;
