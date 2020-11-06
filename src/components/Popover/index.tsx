import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { PopOverWrapper } from './styles';
import './popover.css';

interface PopoverProps {
  nodeRef: React.RefObject<HTMLElement>;
  content?: JSX.Element;
  onClickOutside?(): void;
}

const Popover = ({
  content,
  nodeRef,
  onClickOutside,
}: PopoverProps): React.ReactPortal => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const getPositions = (): { x: number; y: number } => {
    const rect = nodeRef.current?.getBoundingClientRect();

    if (rect) {
      return {
        x: rect.left,
        y: rect.bottom,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(event.target as HTMLElement)
      ) {
        const clickEventType = event.target && event.target.toString();
        if (!clickEventType?.includes('Button')) {
          onClickOutside && onClickOutside();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [nodeRef, onClickOutside]);

  return ReactDOM.createPortal(
    <PopOverWrapper
      className="popover__wrapper active"
      posX={getPositions().x}
      posY={getPositions().y}
    >
      <div className="popover__content">{content}</div>
    </PopOverWrapper>,
    document.body,
  );
};

export default Popover;
