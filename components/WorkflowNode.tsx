import React, { useState } from 'react';
import { NodeData, Position } from '../types';

interface WorkflowNodeProps {
  node: NodeData;
  onMove: (id: string, position: Position) => void;
  onDoubleClick: () => void;
  scale: number;
  isSelected: boolean;
}

const nodeStyles: React.CSSProperties = {
  position: 'absolute',
  width: '200px',
  padding: '15px',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--border-radius)',
  cursor: 'grab',
  userSelect: 'none',
  boxShadow: 'var(--shadow)',
  transition: 'box-shadow 0.2s ease-in-out, outline-color 0.2s ease-in-out',
};

const nodeHeaderStyles: React.CSSProperties = {
  fontWeight: 'bold',
  marginBottom: '5px',
  color: 'var(--color-text)',
};

const nodeDescriptionStyles: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--color-text-muted)',
};

const typeColors: { [key: string]: string } = {
    Trigger: '#4CAF50',
    AI: '#2196F3',
    Logic: '#FFC107',
    Integration: '#9C27B0',
    Output: '#E91E63',
};

const WorkflowNode = ({ node, onMove, onDoubleClick, scale, isSelected }: WorkflowNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);

    const handleMouseMove = (event: MouseEvent) => {
      // Adjust movement by the current canvas scale to get correct world coordinates
      const newX = node.position.x + event.movementX / scale;
      const newY = node.position.y + event.movementY / scale;
      onMove(node.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const borderLeftColor = typeColors[node.type] || 'var(--color-primary)';
  const isHighlighted = isDragging || isSelected;

  return (
    <div
      style={{
        ...nodeStyles,
        left: node.position.x,
        top: node.position.y,
        borderLeft: `4px solid ${borderLeftColor}`,
        boxShadow: isDragging ? '0 10px 25px rgba(0,0,0,0.3)' : 'var(--shadow)',
        cursor: isDragging ? 'grabbing' : 'grab',
        outline: `2px solid ${isHighlighted ? 'var(--color-secondary)' : 'transparent'}`,
        outlineOffset: '2px',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <div style={nodeHeaderStyles}>{node.label}</div>
      <p style={nodeDescriptionStyles}>{node.description}</p>
    </div>
  );
};

export default WorkflowNode;