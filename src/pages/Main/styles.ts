import styled from 'styled-components';

export const PageContainer = styled.main`
  display: flex;
  height: 100vh;
`;

export const Container = styled.div`
  padding: 16px;
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: #2b3b48;
  }
`;

export const PageContent = styled.div`
  margin-top: 25px;
  width: 100%;
  border: 2px dashed #2b3b48;
  position: relative;
  overflow: hidden;
  height: 90%;
`;

export const PopOverContainer = styled.div`
  width: 300px;
  height: 100px;
  background: #e1e1e1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    all: unset;
    cursor: pointer;
    padding: 8px 20px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #fff;
    background-color: #ea604c;
    margin-top: 20px;
    transition: background-color 0.2s;
    &:hover {
      background-color: #ea404c;
    }
  }
`;
