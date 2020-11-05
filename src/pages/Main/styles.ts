import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    all: unset;
    cursor: pointer;
    padding: 8px 20px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #000;
    background-color: #ff9000;
    margin-left: 20px;
    transition: background-color 0.2s;
    &:hover {
      background-color: #ff7000;
    }
  }
`;

export const PageContent = styled.div`
  margin-top: 25px;
  width: 100%;
  height: 100vh;
  border: 2px dotted #ff9000;
  position: relative;
  overflow: hidden;
`;
