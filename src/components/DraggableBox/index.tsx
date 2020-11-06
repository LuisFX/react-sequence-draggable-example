import React, { useCallback, useState, useRef } from 'react';
import Popover from '../Popover';

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
  timeout?: number;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({
  title,
  id,
  onClickClose,
  onClickAddNode,
  onClickBox,
  isConnected,
  popOverElement,
  timeout = 3000,
}) => {
  const [openPopover, setOpenPopover] = useState(false);
  const addNodeButtonRef = useRef<HTMLButtonElement>(null);
  const handleClickBox = useCallback(
    (e) => {
      e.stopPropagation();
      onClickBox && onClickBox();
    },
    [onClickBox],
  );

  return (
    <Container id={id}>
      <BoxContent className="handle">
        <CloseButton onClick={onClickClose}>X</CloseButton>
        {!isConnected && (
          <>
            <AddNodeButton
              id={id}
              ref={addNodeButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                onClickAddNode && onClickAddNode();
                setOpenPopover(!openPopover);
                setTimeout(() => {
                  setOpenPopover(false);
                }, timeout);
              }}
            >
              +
            </AddNodeButton>
            {openPopover && (
              <Popover
                content={popOverElement}
                nodeRef={addNodeButtonRef}
                onClickOutside={() => setOpenPopover(!openPopover)}
              />
            )}
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
