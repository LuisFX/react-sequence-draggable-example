import React, { useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  OnLoadParams,
  Elements,
  Edge,
  Connection,
  FlowElement,
} from 'react-flow-renderer';
import initialElements from './initial-elements';

const onLoad = (reactFlowInstance: OnLoadParams): void => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

export interface FlowComponentsProps {
  onNodeClick?(element: FlowElement): void;
}

const FlowComponent: React.FC<FlowComponentsProps> = ({ onNodeClick }) => {
  const [elements, setElements] = useState<Elements>(initialElements);

  const onElementsRemove = (elementsToRemove: Elements): void =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (connection: Edge | Connection): void =>
    setElements((els) => addEdge(connection, els));

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onElementClick={(event, element) => onNodeClick && onNodeClick(element)}
      onLoad={onLoad}
      snapToGrid
      snapGrid={[15, 15]}
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};
export default FlowComponent;
