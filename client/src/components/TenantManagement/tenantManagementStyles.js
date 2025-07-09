
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

// Keyframes for pulsating glow
const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); }
  50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.6); }
  100% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); }
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
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primaryHover});
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 50px; /* More curved */
  padding: 0.4rem 1rem; /* Decreased padding */

  &:hover {
    background: linear-gradient(45deg, ${({ theme }) => theme.primaryHover}, ${({ theme }) => theme.primary});
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  svg {
    font-size: 0.9em; /* Decreased icon size */
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr; /* Single column on small screens */
    gap: 1rem;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem; /* Reduced padding for small screens */
  }

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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem; /* Smaller font size for small screens */
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.4rem; /* Smaller font size for small screens */
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.6rem; /* Smaller font size for small screens */
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const ActionButton = styled.button.attrs((props) => ({
  style: {
    background: `linear-gradient(135deg, ${props.theme[props.color]} 20%, ${props.theme[props.color + "Hover"
    ]} 100%)`, /* Even higher opacity for darker vibrancy */
  },
}))`
  ${buttonBase}
  color: white; /* Revert text color to white */
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 50px; /* More curved */
  padding: 0.5rem 1rem; /* Decreased padding */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); /* Stronger default shadow */
  transition: all 0.3s ease-in-out;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* Stronger text shadow for white text */
  border: 1px solid ${({ theme }) => theme.border}; /* Add a subtle border */

  &:hover {
    transform: translateY(-5px) scale(1.08);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4); /* Stronger pronounced shadow */
    border: 1px solid rgba(255, 255, 255, 0.7); /* More visible white border on hover */
    animation: ${pulseGlow} 1.5s infinite alternate;
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
      rgba(255, 255, 255, 0.4), /* More visible shine */
      transparent
    );
    animation: ${shine} 3s infinite;
  }

  svg {
    font-size: 0.9em; /* Decreased icon size */
    color: white; /* Revert icon color to white */
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
