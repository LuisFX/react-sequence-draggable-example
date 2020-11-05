import React from 'react';

import { Container, CloseButton, AddNodeButton } from './styles';

export interface DraggableBoxProps {
  title: string;
  onClickClose?: () => void;
  onClickAddNode?: () => void;
  id?: string;
  isConnected?: boolean;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({
  title,
  id,
  onClickClose,
  onClickAddNode,
  isConnected,
}) => {
  return (
    <Container id={id}>
      <CloseButton onClick={onClickClose}>X</CloseButton>
      {!isConnected && (
        <AddNodeButton id={id} onClick={onClickAddNode}>
          +
        </AddNodeButton>
      )}
      <h3>{title}</h3>
    </Container>
  );
};

export default DraggableBox;
