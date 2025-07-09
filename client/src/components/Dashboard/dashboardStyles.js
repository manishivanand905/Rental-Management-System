
import styled, { keyframes } from "styled-components";

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Container
export const DashboardContainer = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Grid Layout
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

// Card Component
export const DashboardCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  animation: ${fadeIn} 0.4s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 2px;
    background: ${({ theme, color }) => {
      switch (color) {
        case "success":
          return `linear-gradient(to right, ${theme.success}, ${theme.primary})`;
        case "warning":
          return `linear-gradient(to right, ${theme.warning}, ${theme.error})`;
        case "error":
          return `linear-gradient(to right, ${theme.error}, ${theme.warning})`;
        case "info":
          return `linear-gradient(to right, ${theme.primary}, ${theme.success})`;
        default:
          return `linear-gradient(to right, ${theme.primary}, ${theme.success})`;
      }
    }};
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowHover};
    &::before {
      opacity: 1;
    }
  }
`;

// Icon Container
export const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background: ${({ theme, color }) => {
    switch (color) {
      case "success":
        return theme.success;
      case "warning":
        return theme.warning;
      case "error":
        return theme.error;
      case "info":
        return theme.primary;
      default:
        return theme.primary;
    }
  }};
`;

// Content Container
export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

// Card Title
export const CardTitle = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
`;

// Card Value
export const CardValue = styled.p`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

// Card Subtitle
export const CardSubtitle = styled.span`
  font-size: 0.8rem;
  color: ${({ theme, color }) => {
    switch (color) {
      case "success":
        return theme.success;
      case "warning":
        return theme.warning;
      case "error":
        return theme.error;
      case "info":
        return theme.primary;
      default:
        return theme.textMuted;
    }
  }};
  font-weight: 500;
`;

// Additional Info Grid
export const AdditionalInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

// Info Card
export const InfoCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  animation: ${fadeIn} 0.6s ease-out;
`;

// Info Card Header
export const InfoCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  font-size: 1.1rem;

  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1.25rem;
  }
`;

// Info Card Content
export const InfoCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Info Row
export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.9rem;
  }

  strong {
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    font-size: 1rem;
  }
`;

// Collection Bar
export const CollectionBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.inputBackground};
  border-radius: 4px;
  overflow: hidden;
`;

// Collection Progress
export const CollectionProgress = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background: ${(props) => props.color};
  transition: width 0.5s ease-in-out;
  border-radius: 4px;
`;

// Occupancy Rate
export const OccupancyRate = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

// Occupancy Number
export const OccupancyNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`;

// Occupancy Text
export const OccupancyText = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;
