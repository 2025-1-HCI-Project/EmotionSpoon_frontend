import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Vazirmatn:wght@100..900&display=swap" rel="stylesheet');

  * {
      font-family: "Vazirmatn", sans-serif;
      font-optical-sizing: auto;
      font-style: normal;
  }
`;

export default GlobalStyle;