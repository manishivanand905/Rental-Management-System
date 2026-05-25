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
  width: min(920px, 100%);
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
  font-size: 1.45rem;
  margin-bottom: 0.45rem;
`;

export const ModalBody = styled.div`
  padding: 1.4rem 1.5rem;
`;

export const ModalActions = styled.div`
  padding: 1rem 1.5rem 1.35rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: flex-end;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: grid;
  gap: 0.55rem;
`;

export const InlineFieldGroup = styled(FormGroup)`
  max-width: 220px;
  margin-bottom: 1.1rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 700;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.error};
`;

const fieldStyles = `
  width: 100%;
  padding: 0.95rem 1rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }
`;

export const Input = styled.input`
  ${fieldStyles}
`;

export const Select = styled.select`
  ${fieldStyles}
  color: #111111;
  background: #ffffff;

  option {
    color: #111111;
  }
`;

export const HelperText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const MemberGrid = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

export const MemberCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  align-items: center;
  padding: 0.85rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 1.15rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 700;
  transition: transform 0.22s ease, border-color 0.22s ease;
  border: 1px solid transparent;

  ${({ $variant, theme }) => {
    if ($variant === "ghost") {
      return `
        background: ${theme.surface};
        color: ${theme.text};
        border-color: ${theme.border};
      `;
    }

    if ($variant === "secondary") {
      return `
        background: ${theme.surfaceMuted};
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

  &:hover {
    transform: translateY(-1px);
  }
`;

export const ImagePreviewCard = styled.div`
  display: grid;
  gap: 0.8rem;
  justify-items: start;
  padding: 0.9rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
`;

export const ImagePreview = styled.img`
  width: 100%;
  max-width: 220px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.border};
`;
