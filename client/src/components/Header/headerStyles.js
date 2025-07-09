import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.headerBackground};
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.8rem 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    padding: 0.5rem 1rem;
    gap: 0.5rem; /* Add some space between stacked items */
  }
`;

export const HeaderTitle = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.3rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.2rem;
  }
`;

export const ThemeToggle = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
  }

  svg {
    font-size: 1.2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 1rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 35px;
    height: 35px;
  }
`;

export const UserInfo = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.8rem;
  }
`;