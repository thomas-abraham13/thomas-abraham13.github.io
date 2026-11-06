import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   body {
     background: ${({ theme }) => theme.background};
     color: ${({ theme }) => theme.color};
     transition: background-color 0.5s linear, color 0.5s linear;
  }
`;

export default GlobalStyles;
