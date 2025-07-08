import styled, { keyframes } from "styled-components";

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(66, 153, 225, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
  }
`;

// Container
export const DashboardContainer = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// Grid Layout
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

// Card Component
export const DashboardCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => {
      switch (props.color || "primary") {
        case "success":
          return "linear-gradient(45deg, #48bb78, #38a169)";
        case "warning":
          return "linear-gradient(45deg, #ed8936, #dd6b20)";
        case "error":
          return "linear-gradient(45deg, #f56565, #e53e3e)";
        case "info":
          return "linear-gradient(45deg, #4299e1, #3182ce)";
        default:
          return "linear-gradient(45deg, #4299e1, #3182ce)";
      }
    }};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    animation: ${pulse} 2s infinite;
  }

  @media (max-width: 768px) {
    padding: 20px;
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 12px;
    flex-direction: column;
    text-align: center;
  }
`;

// Icon Container
export const CardIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  background: ${(props) => {
    switch (props.color) {
      case "success":
        return "linear-gradient(45deg, #48bb78, #38a169)";
      case "warning":
        return "linear-gradient(45deg, #ed8936, #dd6b20)";
      case "error":
        return "linear-gradient(45deg, #f56565, #e53e3e)";
      case "info":
        return "linear-gradient(45deg, #4299e1, #3182ce)";
      default:
        return "linear-gradient(45deg, #4299e1, #3182ce)";
    }
  }};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }
`;

// Content Container
export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

// Card Title
export const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #4a5568;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// Card Value
export const CardValue = styled.p`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

// Card Subtitle
export const CardSubtitle = styled.span`
  font-size: 12px;
  color: ${(props) => {
    switch (props.color) {
      case "success":
        return "#38a169";
      case "warning":
        return "#dd6b20";
      case "error":
        return "#e53e3e";
      case "info":
        return "#3182ce";
      default:
        return "#718096";
    }
  }};
  font-weight: 500;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

// Additional Info Grid
export const AdditionalInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 24px auto 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 20px;
  }
`;

// Info Card
export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Info Card Header
export const InfoCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: #4a5568;
  font-weight: 600;
  font-size: 16px;

  svg {
    color: #4299e1;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 14px;

    svg {
      font-size: 16px;
    }
  }
`;

// Info Card Content
export const InfoCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Info Row
export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }

  span {
    color: #718096;
    font-size: 14px;
  }

  strong {
    color: #2d3748;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    span {
      font-size: 13px;
    }
  }
`;

// Collection Bar
export const CollectionBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
`;

// Collection Progress
export const CollectionProgress = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background: ${(props) => props.color};
  transition: width 1s ease-in-out;
  border-radius: 4px;
`;

// Occupancy Rate
export const OccupancyRate = styled.div`
  text-align: center;
  padding: 16px 0;
`;

// Occupancy Number
export const OccupancyNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #4299e1;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

// Occupancy Text
export const OccupancyText = styled.div`
  font-size: 14px;
  color: #718096;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

// Additional styling for specific card types
export const SuccessCard = styled(DashboardCard)`
  &::before {
    background: linear-gradient(45deg, #48bb78, #38a169);
  }
`;

export const WarningCard = styled(DashboardCard)`
  &::before {
    background: linear-gradient(45deg, #ed8936, #dd6b20);
  }
`;

export const ErrorCard = styled(DashboardCard)`
  &::before {
    background: linear-gradient(45deg, #f56565, #e53e3e);
  }
`;

export const InfoCardBlue = styled(DashboardCard)`
  &::before {
    background: linear-gradient(45deg, #4299e1, #3182ce);
  }
`;

// Responsive breakpoints
export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  large: "1200px",
};
