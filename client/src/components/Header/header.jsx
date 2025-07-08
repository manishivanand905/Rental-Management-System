import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import {
  HeaderContainer,
  HeaderTitle,
  ThemeToggle,
  UserInfo,
} from "./headerStyles";

const Header = ({ theme, toggleTheme, userId }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>Rental Management</HeaderTitle>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <ThemeToggle onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
        </ThemeToggle>
        <UserInfo>User ID: {userId}</UserInfo>
      </div>
    </HeaderContainer>
  );
};

export default Header;
