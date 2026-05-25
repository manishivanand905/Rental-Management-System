import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800&display=swap");

  :root {
    color-scheme: ${({ theme }) => theme.mode};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    font-family: "Inter", sans-serif;
    color: ${({ theme }) => theme.text};
    background:
      radial-gradient(circle at top left, rgba(99, 102, 241, 0.26), transparent 26%),
      radial-gradient(circle at top right, rgba(6, 182, 212, 0.18), transparent 22%),
      radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.12), transparent 20%),
      linear-gradient(180deg, ${({ theme }) => theme.backgroundSecondary} 0%, ${({ theme }) => theme.background} 45%, ${({ theme }) => theme.background} 100%);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background 0.35s ease, color 0.35s ease;
  }

  body::before,
  body::after {
    content: "";
    position: fixed;
    inset: auto;
    pointer-events: none;
    z-index: -1;
    filter: blur(80px);
    opacity: 0.62;
  }

  body::before {
    top: -6rem;
    left: -2rem;
    width: 18rem;
    height: 18rem;
    background: rgba(99, 102, 241, 0.28);
  }

  body::after {
    right: -4rem;
    top: 10rem;
    width: 22rem;
    height: 22rem;
    background: rgba(6, 182, 212, 0.18);
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button {
    border: 0;
    cursor: pointer;
  }

  input,
  select,
  textarea {
    border: 0;
    outline: 0;
    background: transparent;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: rgba(99, 102, 241, 0.28);
  }
`;
