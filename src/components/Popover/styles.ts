import styled from 'styled-components';

export const PopOverWrapper = styled.div<{ posY?: number; posX?: number }>`
  position: absolute;
  display: inline-block;
  top: ${(props) => props.posY || 0}px;
  left: ${(props) => props.posX || 0}px;
`;
