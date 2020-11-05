import React, { useState, createRef, RefObject } from 'react';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';
import DraggableBox from '../../components/DraggableBox';

import { Container, Menu, PageContent } from './styles';

interface ArrowStateProps {
  arrowId: string;
  start: string;
  end: string;
}

const Main: React.FC = () => {
  const [activeSelection, setActiveSelection] = useState('');
  const [cursor, setCursor] = useState('auto');
  const [, setRender] = useState({});
  const forceRerender = (): void => setRender({});
  const [nodes, setNodes] = useState([
    {
      title: 'Sales Page',
      uniqueId: 'sales-page-1',
      ref: createRef() as RefObject<HTMLElement>,
      connected: false,
    },
    {
      title: 'Send Email',
      uniqueId: 'send-email-1',
      ref: createRef() as RefObject<HTMLElement>,
      startPosition: { x: 100, y: 150 },
      connected: false,
    },
  ]);

  const [arrows, setArrows] = useState<ArrowStateProps[]>([]);

  const handleCreateNode = (): void => {
    const nodeName = prompt('Enter nome name');
    if (nodeName) {
      const newNodes = [...nodes];
      newNodes.push({
        title: nodeName,
        uniqueId: `${nodeName}-${Date.now()}`,
        ref: createRef() as RefObject<HTMLElement>,
        startPosition: { x: 300, y: 20 },
        connected: false,
      });
      setNodes(newNodes);
      forceRerender();
    }
  };

  const handleMouseDown = (e: MouseEvent): void => {
    const endTargetId = (e.target as HTMLElement).id;
    const nodeAlreadyConnected = nodes.find(
      (node) => node.uniqueId === endTargetId,
    )?.connected;
    if (activeSelection && !nodeAlreadyConnected) {
      const newArrows = [...arrows];
      newArrows.push({
        arrowId: `${activeSelection}->${endTargetId}`,
        start: activeSelection,
        end: endTargetId,
      });
      setCursor('auto');
      setActiveSelection('');
      setArrows(newArrows);
      const newNodes = [...nodes];
      const nodeIndex = newNodes.findIndex(
        (node) => node.uniqueId === activeSelection,
      );
      if (nodeIndex !== -1) {
        newNodes[nodeIndex].connected = true;
        setNodes(newNodes);
      }
    } else {
      setCursor('auto');
      setActiveSelection('');
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
    setCursor('crosshair');
    setActiveSelection(id);
  };

  return (
    <Container style={{ cursor }}>
      <Menu>
        <h1>Drag n Drop Sequence Example</h1>
        <button type="button" onClick={handleCreateNode}>
          Create Node
        </button>
      </Menu>
      <PageContent id="bounded">
        {nodes.map((node) => (
          <Draggable
            key={node.uniqueId}
            grid={[25, 25]}
            nodeRef={node.ref}
            onDrag={forceRerender}
            onMouseDown={handleMouseDown}
            positionOffset={node.startPosition}
          >
            <div ref={node.ref as React.RefObject<HTMLDivElement>}>
              <DraggableBox
                id={node.uniqueId}
                title={node.title}
                isConnected={node.connected}
                onClickClose={() => handleRemoveNode(node.uniqueId)}
                onClickAddNode={() => handleSelectNewNode(node.uniqueId)}
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
  );
};

export default Main;
