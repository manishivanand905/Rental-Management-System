
import styled, { css, keyframes } from "styled-components";

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shine = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Base styles for buttons
const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
`;

// Styled Components
export const TenantContainer = styled.div`
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const TenantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const TenantTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  font-weight: 700;
`;

export const AddButton = styled.button`
  ${buttonBase}
  background: ${({ theme }) => theme.primary};
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

export const TenantCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.5s ease-out;
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    transform: translateY(-10px) rotate(1deg);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const RoomNumber = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusBadge = styled.span`
  background: ${({ theme, status }) =>
    status === "Active" ? theme.success : theme.warning};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TenantName = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.95rem;

  svg {
    font-size: 1.1rem;
  }
`;

export const DetailLabel = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
`;

export const DetailValue = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

export const RentAmount = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  margin-top: auto;
`;

export const RentLabel = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
`;

export const RentValue = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const ActionButton = styled.button.attrs((props) => ({
  style: {
    background: `linear-gradient(45deg, ${props.theme[props.color]} 0%, ${props.theme[props.color + "Hover"]} 100%)`,
  },
}))`
  ${buttonBase}
  color: white;
  flex: 1;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    animation: ${shine} 3s infinite;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.textMuted};
  font-size: 1.2rem;
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  &::before {
    content: "👥";
    font-size: 4rem;
    opacity: 0.6;
  }
`;

export const PhoneNumber = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: underline;
  }
`;
