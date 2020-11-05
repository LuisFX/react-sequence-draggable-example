import React, { useState, createRef, RefObject } from 'react';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import DraggableBox from '../../components/DraggableBox';
import IframeViewer from '../IframeViewer';

import {
  PageContainer,
  Container,
  Menu,
  PageContent,
  PopOverContainer,
} from './styles';
import './animate.css';

interface ArrowStateProps {
  arrowId: string;
  start: string;
  end: string;
}

interface NodeProps {
  title: string;
  uniqueId: string;
  ref: RefObject<HTMLElement>;
  connected?: boolean;
  startPosition?: { x: number; y: number };
  iframeURL?: string;
  openPopOver: boolean;
}

const Main: React.FC = () => {
  const [iframeActive, setIframeActive] = useState(false);
  const [iframeURL, setIframeURL] = useState('');
  const [cursor, setCursor] = useState('auto');
  const [, setRender] = useState({});
  const forceRerender = (): void => setRender({});
  const [nodes, setNodes] = useState<NodeProps[]>([
    {
      title: 'Sales Page',
      uniqueId: 'sales-page-1',
      ref: createRef() as RefObject<HTMLElement>,
      startPosition: { x: 100, y: 380 },
      connected: false,
      openPopOver: false,
      iframeURL:
        'https://docs.google.com/forms/d/e/1FAIpQLSeYYJ9i5JBP3f-sbN7JSaWMYwq50Pll_MvCxRWpFL66sErUoA/viewform?embedded=true',
    },
    {
      title: 'Send Email',
      uniqueId: 'send-email-1',
      ref: createRef() as RefObject<HTMLElement>,
      startPosition: { x: 100, y: 450 },
      connected: true,
      openPopOver: false,
      iframeURL:
        'https://docs.google.com/forms/d/e/1FAIpQLSchOd4cD2pZATXiapgU57ex3soda3JizOlKLkwrZJ4xGgRoGw/viewform?embedded=true',
    },
  ]);

  const [arrows, setArrows] = useState<ArrowStateProps[]>([
    {
      arrowId: 'send-email-1->sales-page-1',
      start: 'send-email-1',
      end: 'sales-page-1',
    },
  ]);

  const handleCreateNode = (): void => {
    const nodeName = prompt('Enter nome name');
    if (nodeName) {
      const newNodes = [...nodes];
      newNodes.push({
        title: nodeName,
        uniqueId: `${nodeName}-${Date.now()}`,
        ref: createRef() as RefObject<HTMLElement>,
        openPopOver: false,
        startPosition: {
          x: 10,
          y: 10,
        },
        connected: false,
      });
      setNodes(newNodes);
      forceRerender();
    }
  };

  const handleRemoveNode = (nodeId: string): void => {
    const deletedNode = nodes.find((node) => node.uniqueId === nodeId);
    setNodes(nodes.filter((node) => node.uniqueId !== nodeId));
    if (deletedNode) {
      const attachedArrow = arrows.find((arrow) =>
        arrow.arrowId.includes(deletedNode.uniqueId),
      );
      setArrows(
        arrows.filter((arrow) => arrow.arrowId !== attachedArrow?.arrowId),
      );
    }
    forceRerender();
  };

  const handleSelectNewNode = (id: string): void => {
    // setCursor('crosshair');
    // setActiveSelection(id);
    const nodeToOpen = nodes.findIndex((node) => node.uniqueId === id);
    if (nodeToOpen !== -1) {
      const newNodes = [...nodes];
      newNodes[nodeToOpen].openPopOver = true;
      setNodes(newNodes);
    }
  };

  const handleCloseNode = (id: string): void => {
    // setCursor('crosshair');
    // setActiveSelection(id);
    const nodeToOpen = nodes.findIndex((node) => node.uniqueId === id);
    if (nodeToOpen !== -1) {
      const newNodes = [...nodes];
      newNodes[nodeToOpen].openPopOver = false;
      setNodes(newNodes);
    }
  };

  const handleOnClickBox = (urlIframe?: string): void => {
    setIframeActive(true);
    if (urlIframe !== iframeURL) {
      setIframeURL(urlIframe || '');
    }
  };

  return (
    <PageContainer>
      <Container style={{ cursor }} onClick={() => setIframeActive(false)}>
        <Menu>
          <h1>Drag n Drop Sequence Example</h1>
        </Menu>
        <PageContent id="bounded">
          {nodes.map((node) => (
            <Draggable
              key={node.uniqueId}
              grid={[25, 25]}
              nodeRef={node.ref}
              onDrag={forceRerender}
              defaultPosition={node.startPosition}
            >
              <div ref={node.ref as React.RefObject<HTMLDivElement>}>
                <DraggableBox
                  id={node.uniqueId}
                  title={node.title}
                  isConnected={node.connected}
                  onClickClose={() => handleRemoveNode(node.uniqueId)}
                  onClickBox={() => handleOnClickBox(node.iframeURL)}
                  onClickAddNode={() => handleSelectNewNode(node.uniqueId)}
                  popOverElement={
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <Popover
                      isOpen={node.openPopOver}
                      onClickOutside={() => handleCloseNode(node.uniqueId)}
                      padding={20}
                      containerStyle={{
                        top: '-40px',
                      }}
                      positions={['bottom']}
                      content={({ position, popoverRect, childRect }) => (
                        <ArrowContainer
                          position={position}
                          popoverRect={popoverRect}
                          childRect={childRect}
                          arrowColor="#f9f9f9"
                          arrowSize={10}
                        >
                          <PopOverContainer>
                            <h4>Options: </h4>
                            <ul>
                              <li>Do this</li>
                              <li>Do that</li>
                              <li>Do something else</li>
                            </ul>
                            <button type="button" onClick={handleCreateNode}>
                              Create Node
                            </button>
                          </PopOverContainer>
                        </ArrowContainer>
                      )}
                    >
                      <div />
                    </Popover>
                  }
                />
              </div>
            </Draggable>
          ))}
          {arrows.map((arrow) => (
            <Xarrow
              key={arrow.arrowId}
              start={arrow.start}
              end={arrow.end}
              color="#999"
              strokeWidth={3}
              headSize={5}
            />
          ))}
        </PageContent>
      </Container>
      <IframeViewer animate={iframeActive} iframeURL={iframeURL} />
    </PageContainer>
  );
};

export default Main;
