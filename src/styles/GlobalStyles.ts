import { createGlobalStyle } from "styled-components";
import inter from "../assets/fonts/inter_variable.ttf";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    @font-face {
        font-family: 'Inter';
        src: url(${inter}) format('truetype');
    }

    body {
        font-family: 'Inter';
        color: #FFFFFF;
        background-color: #121212;
    };
`;

export default GlobalStyles;
