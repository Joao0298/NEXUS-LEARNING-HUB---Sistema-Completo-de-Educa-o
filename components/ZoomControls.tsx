import React from 'react';

interface ZoomControlsProps {
  onZoom: (direction: 'in' | 'out') => void;
  scale: number;
}

const zoomControlsStyles: React.CSSProperties = {
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  backgroundColor: 'var(--color-surface)',
  padding: '8px',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--shadow)',
  border: '1px solid var(--color-border)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  zIndex: 10,
};

const buttonStyles: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--color-text)',
  cursor: 'pointer',
  fontSize: '24px',
  padding: '0 5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const scaleDisplayStyles: React.CSSProperties = {
  minWidth: '40px',
  textAlign: 'center',
  fontSize: '0.9rem',
  color: 'var(--color-text-muted)',
};

const ZoomControls = ({ onZoom, scale }: ZoomControlsProps) => {
  return (
    <div style={zoomControlsStyles}>
      <button style={buttonStyles} onClick={() => onZoom('out')} title="Zoom Out">
        <span className="material-icons">remove</span>
      </button>
      <div style={scaleDisplayStyles}>{Math.round(scale * 100)}%</div>
      <button style={buttonStyles} onClick={() => onZoom('in')} title="Zoom In">
        <span className="material-icons">add</span>
      </button>
    </div>
  );
};

export default ZoomControls;
