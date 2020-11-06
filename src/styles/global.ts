import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    background: #151F2A;
    color: #333;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-family: Ubuntu, sans-serif;
    font-size: 16px;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }

  .slide-enter {
  width: 1%;
  }

  .slide-enter.slide-enter-active {
    width: 70%;
    transition: 500ms ease-in;
  }

  .slide-leave {
    width: 70%;
  }

  .slide-leave.slide-leave-active {
    width: 1%;
    transition: 300ms ease-in;
  }
`;
