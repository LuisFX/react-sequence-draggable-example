import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    width: 1%;
  }
  100% {
    width: 70%;
  }
`;

export const Container = styled.div<{ animate?: boolean }>`
  width: 70%;
  height: 100vh;
  background: #fff;
  padding: 16px;
  display: ${(props) => (props.animate ? 'block' : 'none')};
  animation: 0.5s ${slideIn} linear;
`;
