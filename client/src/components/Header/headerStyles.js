import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.headerBackground};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const HeaderTitle = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const UserInfo = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;
