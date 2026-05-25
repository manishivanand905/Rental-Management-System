import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.35rem;
  margin: 1rem;
  background: ${({ theme }) => theme.headerBackground};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.borderStrong};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    grid-template-columns: 1fr auto;
    align-items: center;
    margin: 0.85rem 1rem 0;
    padding: 0.8rem 0.95rem;
    gap: 0.75rem;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

export const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const BrandEyebrow = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`;

export const BrandTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: clamp(1.4rem, 2vw, 1.75rem);
  font-weight: 700;
  color: ${({ theme }) => theme.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.15rem;
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavButton = styled.button`
  padding: 0.72rem 1rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-end;
    margin-left: auto;
  }
`;

export const LiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 0.95rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: #f8fbff;
  background: ${({ theme }) => theme.gradients.glow};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  font-size: 0.88rem;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const HeaderMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 0.95rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 0.88rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const ThemeToggle = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  color: ${({ theme }) => theme.text};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px) rotate(8deg);
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 2.6rem;
    height: 2.6rem;
  }
`;
