
import React from 'react';
import { AgentType } from '../types';

interface AgentInfo {
  type: AgentType;
  label: string;
  icon: string;
}

const agentTypes: AgentInfo[] = [
  { type: 'Trigger', label: 'Event Trigger', icon: '⚡️' },
  { type: 'Integration', label: 'Google Sheets', icon: '📄' },
  { type: 'Logic', label: 'Conditional Logic', icon: '🔀' },
  { type: 'AI', label: 'Generative AI', icon: '🤖' },
  { type: 'Output', label: 'Slack Message', icon: '💬' },
];

const paletteStyles: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  backgroundColor: 'var(--color-surface)',
  padding: '12px',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--shadow)',
  border: '1px solid var(--color-border)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  zIndex: 10,
};

const agentItemStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: 'var(--color-surface-2)',
  borderRadius: '6px',
  cursor: 'grab',
  transition: 'background-color 0.2s',
  border: '1px solid var(--color-border)',
};

const AgentPalette = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, agentType: AgentInfo) => {
    event.dataTransfer.setData('application/nexus-ai-agent', JSON.stringify(agentType));
    event.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div style={paletteStyles}>
      <h3 style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '5px' }}>Agents</h3>
      {agentTypes.map((agent) => (
        <div
          key={agent.type}
          style={agentItemStyles}
          draggable
          onDragStart={(e) => onDragStart(e, agent)}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'}
        >
          <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>{agent.icon}</span>
          <span>{agent.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AgentPalette;
