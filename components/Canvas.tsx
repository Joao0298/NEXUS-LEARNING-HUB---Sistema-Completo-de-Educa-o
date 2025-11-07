import React from 'react';
import { Workflow, NodeData, Position, AgentType, ToastMessage } from '../types';
import WorkflowNode from './WorkflowNode';
import NodeModal from './NodeModal';

interface CanvasProps {
  workflow: Workflow;
  scale: number;
  viewPosition: Position;
  onNodeMove: (id: string, position: Position) => void;
  handleNodeDoubleClick: (node: NodeData) => void;
  handleCanvasDrag: (event: React.MouseEvent) => void;
  handleCanvasMouseDown: (event: React.MouseEvent) => void;
  handleCanvasMouseUp: (event: React.MouseEvent) => void;
  handleDrop: (event: React.DragEvent) => void;
  handleDragOver: (event: React.DragEvent) => void;
  setToastMessages: React.Dispatch<React.SetStateAction<ToastMessage[]>>;
  selectedNodeId?: string;
}

const canvasContainerStyles: React.CSSProperties = {
  flex: 1,
  position: 'relative',
  backgroundColor: '#0a0a0a',
  backgroundImage: 'radial-gradient(#222 1px, transparent 0)',
  backgroundSize: '20px 20px',
  overflow: 'hidden',
};

const canvasStyles: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  transformOrigin: '0 0',
};

const Canvas = ({
  workflow,
  scale,
  viewPosition,
  onNodeMove,
  handleNodeDoubleClick,
  handleCanvasDrag,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleDrop,
  handleDragOver,
  setToastMessages,
  selectedNodeId
}: CanvasProps) => {
  
  // A simple way to draw edges, could be improved with curves
  const renderEdges = () => {
    return workflow.edges.map(edge => {
      const sourceNode = workflow.nodes.find(n => n.id === edge.source);
      const targetNode = workflow.nodes.find(n => n.id === edge.target);
      if (!sourceNode || !targetNode) return null;

      const x1 = sourceNode.position.x + 100; // mid-point approx
      const y1 = sourceNode.position.y + 40;
      const x2 = targetNode.position.x + 100;
      const y2 = targetNode.position.y + 40;

      return (
        <svg key={edge.id} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-text-muted)" strokeWidth="2" />
        </svg>
      );
    });
  };

  return (
    <div
      style={canvasContainerStyles}
      onMouseMove={handleCanvasDrag}
      onMouseDown={handleCanvasMouseDown}
      onMouseUp={handleCanvasMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div
        style={{
          ...canvasStyles,
          transform: `scale(${scale}) translate(${viewPosition.x}px, ${viewPosition.y}px)`,
        }}
      >
        {renderEdges()}
        {workflow.nodes.map(node => (
          <WorkflowNode
            key={node.id}
            node={node}
            onMove={onNodeMove}
            onDoubleClick={() => handleNodeDoubleClick(node)}
            scale={scale}
            isSelected={node.id === selectedNodeId}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;