import styled from "styled-components";

export const TenantContainer = styled.section`
  display: grid;
  gap: 1.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 1rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SectionEyebrow = styled.span`
  display: inline-block;
  margin-bottom: 0.45rem;
  color: ${({ theme }) => theme.accent};
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 800;
`;

export const SectionTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2.3rem);
  color: ${({ theme }) => theme.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.35rem;
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.95rem 1.3rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.gradients.hero};
  color: #f8fbff;
  font-weight: 700;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-2px) scale(1.01);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.8rem 1rem;
    font-size: 0.88rem;
  }
`;

export const FilterBar = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  backdrop-filter: blur(18px);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.8rem;
    padding: 0.85rem;
  }
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 1rem 1.05rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.85rem 0.95rem;
    font-size: 0.9rem;
  }
`;

export const InfoCluster = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.5rem;
  }
`;

export const BadgePill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-self: start;
  width: fit-content;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 0.82rem;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.5rem 0.7rem;
    font-size: 0.72rem;
  }
`;

export const FilterButton = styled.button`
  padding: 0.68rem 0.95rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $active, theme }) => ($active ? theme.gradients.glow : theme.surface)};
  color: ${({ $active, theme }) => ($active ? "#f8fbff" : theme.textSecondary)};
  border: 1px solid ${({ $active, theme }) => ($active ? "transparent" : theme.border)};
  font-weight: 700;
  transition: transform 0.22s ease;

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.55rem 0.72rem;
    font-size: 0.76rem;
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

export const TenantCard = styled.article`
  display: grid;
  gap: 1rem;
  padding: 1.15rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    radial-gradient(circle at top right, ${({ theme, tone }) => {
      if (tone === "danger") return theme.errorSoft;
      if (tone === "warning") return theme.warningSoft;
      if (tone === "success") return theme.successSoft;
      return theme.infoSoft;
    }}, transparent 38%),
    ${({ theme }) => theme.cardBackgroundStrong};
  border: 1px solid ${({ theme, tone }) => {
    if (tone === "danger" || tone === "warning") return theme.error;
    return theme.borderStrong;
  }};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.8rem;
    padding: 0.95rem;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

export const TenantTop = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 0.75rem;
  }
`;

export const ProfileAvatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1.35rem;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.gradients.glow};
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 3.15rem;
    height: 3.15rem;
    border-radius: 1rem;
    font-size: 0.95rem;
  }
`;

export const ProfileMeta = styled.div`
  display: grid;
  gap: 0.28rem;

  h3 {
    font-family: "Poppins", sans-serif;
    color: ${({ theme }) => theme.text};
    font-size: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    h3 {
      font-size: 1rem;
    }
  }
`;

export const CardMeta = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.84rem;
  }
`;

export const StatusBadge = styled.span`
  justify-self: end;
  white-space: nowrap;
  padding: 0.65rem 0.8rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ tone, theme }) => {
    if (tone === "danger") return theme.errorSoft;
    if (tone === "warning") return theme.warningSoft;
    if (tone === "success") return theme.successSoft;
    return theme.infoSoft;
  }};
  color: ${({ tone, theme }) => {
    if (tone === "danger") return theme.error;
    if (tone === "warning") return theme.warning;
    if (tone === "success") return theme.success;
    return theme.accent;
  }};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.45rem 0.6rem;
    font-size: 0.66rem;
    justify-self: end;
  }
`;

export const CardBody = styled.div`
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.65rem;
    padding: 0.8rem;
  }
`;

export const ValueLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.94rem;

  strong {
    color: ${({ theme }) => theme.text};
    font-weight: 700;
    text-align: right;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.84rem;
  }
`;

export const TertiaryStat = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.85rem;
  padding-top: 0.35rem;
  border-top: 1px dashed ${({ theme }) => theme.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.76rem;
  }
`;

export const MemberChip = styled.span`
  padding: 0.5rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.surfaceMuted};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.8rem;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.42rem 0.58rem;
    font-size: 0.72rem;
  }
`;

export const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.65rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.45rem;
  }
`;

export const QuickAction = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.8rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  transition: transform 0.22s ease, border-color 0.22s ease;

  svg {
    color: ${({ $tone, theme }) => {
      if ($tone === "payments") return theme.accent;
      if ($tone === "edit") return theme.warning;
      if ($tone === "whatsapp") return theme.success;
      if ($tone === "call") return "#38bdf8";
      if ($tone === "delete") return theme.error;
      return theme.text;
    }};
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ $tone, theme }) => {
      if ($tone === "payments") return theme.accent;
      if ($tone === "edit") return theme.warning;
      if ($tone === "whatsapp") return theme.success;
      if ($tone === "call") return "#38bdf8";
      if ($tone === "delete") return theme.error;
      return theme.accent;
    }};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 2.5rem;
    padding: 0.65rem 0.5rem;
    font-size: 0;
    gap: 0;

    svg {
      font-size: 0.95rem;
    }
  }
`;

export const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.cardBackgroundStrong};
  border: 1px solid ${({ theme }) => theme.borderStrong};

  h3 {
    font-family: "Poppins", sans-serif;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.55rem;
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.65;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2rem 1rem;
  }
`;
