import React from 'react';

const tipsPanelStyles: React.CSSProperties = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  backgroundColor: 'var(--color-surface-2)',
  padding: '15px',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--shadow)',
  border: '1px solid var(--color-border)',
  maxWidth: '300px',
  zIndex: 10,
};

const tipHeaderStyles: React.CSSProperties = {
    color: 'var(--color-primary)',
    fontWeight: 600,
    marginBottom: '8px',
};

const TipsPanel = () => {
  return (
    <div style={tipsPanelStyles}>
        <h4 style={tipHeaderStyles}>💡 Pro Tip</h4>
        <p style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>
            Use the "✨ Enhance with AI" button in the agent editor to automatically improve your labels and descriptions for clarity.
        </p>
    </div>
  );
};

export default TipsPanel;
