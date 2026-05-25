import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faBell,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import {
  BrandBlock,
  BrandEyebrow,
  BrandTitle,
  HeaderActions,
  HeaderContainer,
  HeaderMeta,
  HeaderNav,
  LiveBadge,
  NavButton,
  ThemeToggle,
} from "./headerStyles";

const Header = ({ theme, toggleTheme, onJump }) => {
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "tenants", label: "Tenants" },
    { id: "payments", label: "Payments" },
  ];

  return (
    <HeaderContainer>
      <BrandBlock>
        <BrandEyebrow>Rental</BrandEyebrow>
        <BrandTitle>RentEell</BrandTitle>
      </BrandBlock>

      <HeaderNav>
        {navItems.map((item) => (
          <NavButton key={item.id} onClick={() => onJump(item.id)}>
            {item.label}
          </NavButton>
        ))}
      </HeaderNav>

      <HeaderActions>
        <LiveBadge>
          <FontAwesomeIcon icon={faArrowTrendUp} />
          Overview
        </LiveBadge>
        <HeaderMeta>
          <FontAwesomeIcon icon={faBell} />
          Alerts
        </HeaderMeta>
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
        </ThemeToggle>
      </HeaderActions>
    </HeaderContainer>
  );
};

export default Header;
