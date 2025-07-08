// import styled from "styled-components";

// export const TenantContainer = styled.div`
//   padding: 2rem;
//   background-color: ${({ theme }) => theme.background};
//   min-height: 60vh;

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// export const TenantHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 1rem;
//     align-items: stretch;
//   }
// `;

// export const TenantTitle = styled.h2`
//   color: ${({ theme }) => theme.text};
//   font-size: 1.8rem;
//   font-weight: 600;
//   margin: 0;

//   @media (max-width: 768px) {
//     font-size: 1.5rem;
//     text-align: center;
//   }
// `;

// export const AddButton = styled.button`
//   background: ${({ theme }) => theme.primary};
//   color: white;
//   border: none;
//   border-radius: 8px;
//   padding: 0.75rem 1.5rem;
//   font-size: 1rem;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   transition: all 0.3s ease;

//   &:hover {
//     background: ${({ theme }) => theme.primaryHover};
//     transform: translateY(-2px);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

// export const TenantTable = styled.div`
//   background: ${({ theme }) => theme.cardBackground};
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: ${({ theme }) => theme.shadow};
//   border: 1px solid ${({ theme }) => theme.border};

//   @media (max-width: 768px) {
//     overflow-x: auto;
//   }
// `;

// export const TableHeader = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1.5fr 1.5fr 1.2fr 1.2fr 1fr 1.5fr;
//   background: ${({ theme }) => theme.inputBackground};
//   border-bottom: 1px solid ${({ theme }) => theme.border};

//   @media (max-width: 768px) {
//     min-width: 800px;
//   }
// `;

// export const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1.5fr 1.5fr 1.2fr 1.2fr 1fr 1.5fr;
//   border-bottom: 1px solid ${({ theme }) => theme.border};
//   transition: all 0.3s ease;

//   &:hover {
//     background: ${({ theme }) => theme.inputBackground};
//   }

//   &:last-child {
//     border-bottom: none;
//   }

//   @media (max-width: 768px) {
//     min-width: 800px;
//   }
// `;

// export const TableCell = styled.div`
//   padding: 1rem;
//   color: ${({ theme }) => theme.text};
//   font-size: 0.9rem;
//   display: flex;
//   align-items: center;
//   border-right: 1px solid ${({ theme }) => theme.border};

//   &:last-child {
//     border-right: none;
//   }

//   ${TableHeader} & {
//     font-weight: 600;
//     color: ${({ theme }) => theme.textSecondary};
//     text-transform: uppercase;
//     font-size: 0.8rem;
//     letter-spacing: 0.5px;
//   }
// `;

// export const StatusBadge = styled.span`
//   background: ${({ theme, status }) =>
//     status === "Active" ? theme.success : theme.warning};
//   color: white;
//   padding: 0.25rem 0.75rem;
//   border-radius: 20px;
//   font-size: 0.8rem;
//   font-weight: 500;
//   text-transform: uppercase;
// `;

// export const ActionGroup = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// export const ActionButton = styled.button`
//   width: 36px;
//   height: 36px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 0.9rem;
//   transition: all 0.3s ease;

//   background: ${({ theme, color }) => {
//     switch (color) {
//       case "primary":
//         return theme.primary;
//       case "warning":
//         return theme.warning;
//       case "error":
//         return theme.error;
//       default:
//         return theme.primary;
//     }
//   }};

//   color: white;

//   &:hover {
//     background: ${({ theme, color }) => {
//       switch (color) {
//         case "primary":
//           return theme.primaryHover;
//         case "warning":
//           return theme.warningHover;
//         case "error":
//           return theme.errorHover;
//         default:
//           return theme.primaryHover;
//       }
//     }};
//     transform: translateY(-2px);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

// export const EmptyState = styled.div`
//   text-align: center;
//   padding: 4rem 2rem;
//   color: ${({ theme }) => theme.textMuted};
//   font-size: 1.1rem;
//   background: ${({ theme }) => theme.cardBackground};
//   border-radius: 12px;
//   border: 1px solid ${({ theme }) => theme.border};
// `;

import styled from "styled-components";

export const TenantContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  min-height: 60vh;

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
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

export const AddButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const TenantCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.primary};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const RoomNumber = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const StatusBadge = styled.span`
  background: ${({ theme, status }) =>
    status === "Active" ? theme.success : theme.warning};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TenantName = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

export const CardDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const DetailLabel = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 600;
`;

export const RentAmount = styled.div`
  background: ${({ theme }) => theme.inputBackground};
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const RentLabel = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
`;

export const RentValue = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 1.4rem;
  font-weight: 700;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  max-width: 120px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  background: ${({ theme, color }) => {
    switch (color) {
      case "primary":
        return theme.primary;
      case "warning":
        return theme.warning;
      case "error":
        return theme.error;
      default:
        return theme.primary;
    }
  }};

  color: white;

  &:hover {
    background: ${({ theme, color }) => {
      switch (color) {
        case "primary":
          return theme.primaryHover;
        case "warning":
          return theme.warningHover;
        case "error":
          return theme.errorHover;
        default:
          return theme.primaryHover;
      }
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.textMuted};
  font-size: 1.1rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &::before {
    content: "🏠";
    font-size: 3rem;
    opacity: 0.5;
  }
`;

export const LoadingCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  position: relative;
  overflow: hidden;

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
      rgba(255, 255, 255, 0.1),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
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
