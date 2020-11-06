import styled from 'styled-components';

export const Container = styled.div`
  width: 200px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: grab;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
  border-radius: 4px;
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
`;

export const CloseButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 8px;
  font-weight: 600;
`;

export const AddNodeButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid #ea604c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.2;
  transition: 0.2s;
  z-index: 6;
  color: #ea604c;
  &:hover {
    opacity: 1;
  }
`;

export const OpenIframeBox = styled.div`
  background: #1d8bdf;
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
`;

export const PopOverWrapper = styled.div<{ posY?: number; posX?: number }>`
  position: absolute;
  display: inline-block;
  top: ${(props) => props.posY || 0}px;
  left: ${(props) => props.posX || 0}px;
`;
