import styled from "styled-components";

const toneStyles = {
  primary: {
    bg: "rgba(99, 102, 241, 0.16)",
    color: "#8B90FF",
  },
  success: {
    bg: "rgba(34, 197, 94, 0.16)",
    color: "#4ADE80",
  },
  danger: {
    bg: "rgba(239, 68, 68, 0.16)",
    color: "#FB7185",
  },
  info: {
    bg: "rgba(6, 182, 212, 0.16)",
    color: "#22D3EE",
  },
};

const getTone = (tone, key) => toneStyles[tone]?.[key] || toneStyles.primary[key];

export const DashboardContainer = styled.section`
  display: grid;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 1rem;
  }
`;

export const InsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    grid-template-columns: 1fr;
  }
`;

export const InsightCard = styled.article`
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 1rem;
  padding: 1.35rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  backdrop-filter: blur(18px);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.75rem;
    padding: 1rem;
  }
`;

export const InsightAccent = styled.div`
  position: absolute;
  inset: auto auto -2.5rem -2rem;
  width: 8rem;
  height: 8rem;
  border-radius: 999px;
  background: ${({ tone }) => getTone(tone, "bg")};
  filter: blur(8px);
`;

export const InsightIcon = styled.div`
  position: relative;
  width: 3.25rem;
  height: 3.25rem;
  display: grid;
  place-items: center;
  border-radius: 1rem;
  background: ${({ tone }) => getTone(tone, "bg")};
  color: ${({ tone }) => getTone(tone, "color")};
  font-size: 1.2rem;
`;

export const InsightLabel = styled.p`
  position: relative;
  z-index: 1;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textMuted};
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.72rem;
  }
`;

export const InsightValue = styled.h3`
  position: relative;
  z-index: 1;
  margin-top: 0.25rem;
  font-family: "Poppins", sans-serif;
  font-size: clamp(1.9rem, 3vw, 2.35rem);
  color: ${({ theme }) => theme.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.55rem;
  }
`;

export const InsightMeta = styled.p`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.92rem;
  line-height: 1.55;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const AlertGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.article`
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(180deg, rgba(255,255,255,0.04), transparent),
    ${({ theme }) => theme.cardBackgroundStrong};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  box-shadow: ${({ theme }) => theme.shadows.strong};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

export const AlertCard = styled(SummaryCard)`
  display: grid;
  gap: 1rem;
`;

export const SummaryHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.accent};

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0.75rem;
  }
`;

export const AlertTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const AlertMeta = styled.p`
  margin-top: 0.35rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.55;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.85rem;
  }
`;

export const SummaryMetric = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: clamp(2.8rem, 6vw, 4.4rem);
  line-height: 1;
  color: ${({ theme }) => theme.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.2rem;
  }
`;

export const SummaryProgress = styled.div`
  margin-top: 1.35rem;
  height: 0.8rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.surfaceMuted};
  overflow: hidden;
`;

export const SummaryProgressBar = styled.div`
  height: 100%;
  width: ${({ width }) => width}%;
  background: ${({ theme }) => theme.gradients.hero};
  border-radius: inherit;
`;

export const SummaryTimeline = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  flex-wrap: wrap;

  strong {
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.82rem;
  }
`;

export const SpotlightGrid = styled.div``;

export const SpotlightCard = styled.div`
  padding: 1rem 1.05rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.85rem 0.9rem;
  }
`;

export const SpotlightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    gap: 0.55rem;
  }
`;

export const SpotlightTitle = styled.h4`
  color: ${({ theme }) => theme.text};
  font-size: 0.98rem;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.9rem;
  }
`;

export const SpotlightSubtitle = styled.p`
  margin-top: 0.2rem;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.86rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.78rem;
  }
`;

export const SpotlightStatus = styled.span`
  padding: 0.45rem 0.7rem;
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
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.38rem 0.55rem;
    font-size: 0.66rem;
  }
`;

export const SpotlightAmount = styled.div`
  margin: 0.9rem 0 0.45rem;
  font-family: "Poppins", sans-serif;
  font-size: 1.35rem;
  color: ${({ theme }) => theme.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.08rem;
  }
`;
