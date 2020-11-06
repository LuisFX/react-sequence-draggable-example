import React, { useState, createRef, RefObject, useEffect } from 'react';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';
import DraggableBox from '../../components/DraggableBox';
import IframeViewer from '../IframeViewer';
import clickFunnelsImg from '../../assets/images/clickfunnels-logo.webp';

import {
  PageContainer,
  Container,
  Menu,
  PageContent,
  PopOverContainer,
} from './styles';

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
  startPosition: { x: number; y: number };
  iframeURL?: string;
}

const Main: React.FC = () => {
  const [iframeActive, setIframeActive] = useState(false);
  const [iframeURL, setIframeURL] = useState('');
  const [, setRender] = useState({});
  const forceRerender = (): void => setRender({});
  const [offsetYPosition, setOffsetYPosition] = useState(175);
  const [nodes, setNodes] = useState<NodeProps[]>([
    {
      title: 'Send Email',
      uniqueId: 'send-email-1',
      ref: createRef() as RefObject<HTMLElement>,
      startPosition: { x: 100, y: 25 },
      connected: true,
      iframeURL:
        'https://docs.google.com/forms/d/e/1FAIpQLSchOd4cD2pZATXiapgU57ex3soda3JizOlKLkwrZJ4xGgRoGw/viewform?embedded=true',
    },
    {
      title: 'Sales Page',
      uniqueId: 'sales-page-1',
      ref: createRef() as RefObject<HTMLElement>,
      startPosition: { x: 100, y: 100 },
      connected: false,
      iframeURL:
        'https://docs.google.com/forms/d/e/1FAIpQLSeYYJ9i5JBP3f-sbN7JSaWMYwq50Pll_MvCxRWpFL66sErUoA/viewform?embedded=true',
    },
  ]);

  const [arrows, setArrows] = useState<ArrowStateProps[]>([
    {
      arrowId: 'send-email-1->sales-page-1',
      start: 'send-email-1',
      end: 'sales-page-1',
    },
  ]);

  const [reflectedArrows, setReflectedArrows] = useState<ArrowStateProps[]>([
    {
      arrowId: 'send-email-1->sales-page-1',
      start: 'send-email-1',
      end: 'sales-page-1',
    },
  ]);

  const handleCreateNode = (nodeId: string): void => {
    const nodeName = prompt('Enter node name:');
    if (nodeName) {
      const newNodes = [...nodes];
      const nodeIndexToConnect = newNodes.findIndex(
        (node) => node.uniqueId === nodeId,
      );
      if (nodeIndexToConnect !== -1) {
        newNodes[nodeIndexToConnect].connected = true;
      }
      const newNodeId = `${nodeName}-${Date.now()}`;
      newNodes.push({
        title: nodeName,
        uniqueId: newNodeId,
        ref: createRef() as RefObject<HTMLElement>,
        startPosition: {
          x: 100,
          y: offsetYPosition,
        },
        connected: false,
      });
      setNodes([...newNodes]);
      console.log('current', offsetYPosition);
      console.log('next', newNodes.length * 75 + 25);
      setOffsetYPosition(newNodes.length * 75 + 25);
      const newArrows = [...arrows];
      const newNodeStart = nodeId;
      const newNodeEnd = newNodeId;
      newArrows.push({
        arrowId: `${newNodeStart}->${newNodeEnd}`,
        start: nodeId,
        end: newNodeEnd,
      });
      setArrows(newArrows);
    }
  };

  useEffect(() => {
    setReflectedArrows([]);
    setTimeout(() => {
      setReflectedArrows([...arrows]);
    }, 0);
  }, [arrows]);

  const handleRemoveNode = (nodeId: string): void => {
    const deletedNode = nodes.find((node) => node.uniqueId === nodeId);
    const newDeletedNodes = nodes.filter((node) => node.uniqueId !== nodeId);
    if (deletedNode) {
      const attachedArrows = arrows.filter(
        (arrow) => !arrow.arrowId.includes(deletedNode.uniqueId),
      );
      setArrows(attachedArrows);
      const newNodesToDisconnect = newDeletedNodes.map((node) => ({
        ...node,
        connected: !!attachedArrows.find((arrow) =>
          arrow.start.includes(node.uniqueId),
        ),
      }));
      setNodes(newNodesToDisconnect);
    }
    forceRerender();
  };

  const handleOnClickBox = (urlIframe?: string): void => {
    setIframeActive(true);
    if (urlIframe !== iframeURL) {
      setIframeURL(urlIframe || '');
    }
  };

  return (
    <PageContainer>
      <Container onClick={() => setIframeActive(false)}>
        <Menu>
          <img width="80" src={clickFunnelsImg} alt="Click Funnels" />
          <h1>Workflow Builder</h1>
        </Menu>
        <PageContent id="bounded">
          {nodes.map((node) => (
            <Draggable
              key={node.uniqueId}
              grid={[20, 20]}
              nodeRef={node.ref}
              onDrag={forceRerender}
              axis="x"
              handle=".handle"
              positionOffset={node.startPosition}
            >
              <div ref={node.ref as React.RefObject<HTMLDivElement>}>
                <DraggableBox
                  id={node.uniqueId}
                  title={node.title}
                  isConnected={node.connected}
                  onClickClose={() => handleRemoveNode(node.uniqueId)}
                  onClickBox={() => handleOnClickBox(node.iframeURL)}
                  popOverElement={
                    !node.connected ? (
                      <PopOverContainer>
                        <h3>Options</h3>
                        <button
                          type="button"
                          onClick={
                            () => handleCreateNode(node.uniqueId)
                            // eslint-disable-next-line react/jsx-curly-newline
                          }
                        >
                          Create Node
                        </button>
                      </PopOverContainer>
                    ) : undefined
                  }
                />
              </div>
            </Draggable>
          ))}
          {reflectedArrows.map((arrow) => (
            <Xarrow
              key={arrow.arrowId}
              start={arrow.start}
              end={arrow.end}
              path="grid"
              color="#ea604c"
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
