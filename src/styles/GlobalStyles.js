import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  html {
    box-sizing: border-box;
    font-size: 65%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    font-size: 1.5rem;
  }
  body {
    margin: 0;
  background: #f8fbfd;
  color: #525f7f;
  font-family: "Graphik";

	text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

`;
