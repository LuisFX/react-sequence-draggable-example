import React, { useCallback } from 'react';

import {
  Container,
  BoxContent,
  CloseButton,
  AddNodeButton,
  OpenIframeBox,
} from './styles';

export interface DraggableBoxProps {
  title: string;
  onClickClose?: () => void;
  onClickAddNode?: () => void;
  onClickBox?: () => void;
  id?: string;
  isConnected?: boolean;
  popOverElement?: JSX.Element;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({
  title,
  id,
  onClickClose,
  onClickAddNode,
  onClickBox,
  isConnected,
  popOverElement,
}) => {
  const handleClickBox = useCallback(
    (e) => {
      e.stopPropagation();
      onClickBox && onClickBox();
    },
    [onClickBox],
  );

  return (
    <Container id={id}>
      <BoxContent>
        <CloseButton onClick={onClickClose}>X</CloseButton>
        {!isConnected && (
          <>
            <AddNodeButton
              id={id}
              onClick={(e) => {
                e.stopPropagation();
                onClickAddNode && onClickAddNode();
              }}
            >
              +
            </AddNodeButton>
            {popOverElement}
          </>
        )}
        <h3 id={id}>{title}</h3>
      </BoxContent>
      <OpenIframeBox id={id} onClick={handleClickBox}>
        <h5>Open Iframe Dialog</h5>
      </OpenIframeBox>
    </Container>
  );
};

export default DraggableBox;
