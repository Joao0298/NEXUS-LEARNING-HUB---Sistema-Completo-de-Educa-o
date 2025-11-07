import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const sidebarStyles: React.CSSProperties = {
  width: '70px',
  backgroundColor: 'var(--color-surface)',
  padding: '20px 0',
  borderRight: '1px solid var(--color-border)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '30px',
  zIndex: 20,
};

const logoStyles: React.CSSProperties = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'var(--color-text)',
    background: 'var(--gradient-primary)',
    width: '45px',
    height: '45px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
};

const navItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    transition: 'all 0.2s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const activeIndicatorStyles: React.CSSProperties = {
    position: 'absolute',
    left: '-15px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '24px',
    background: 'var(--gradient-primary)',
    borderRadius: '0 4px 4px 0'
};

const iconStyles: React.CSSProperties = {
    fontSize: '28px'
};


const NavItem = ({
  icon,
  label,
  isActive,
  onClick
}: { icon: string; label: string; isActive: boolean; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      style={{
        ...navItemStyles,
        color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
      }}
      title={label}
    >
      {isActive && <div style={activeIndicatorStyles} />}
      <span className="material-icons" style={iconStyles}>{icon}</span>
    </div>
  );
};

const Sidebar = ({ currentView, setView }: SidebarProps) => {
  return (
    <aside style={sidebarStyles}>
      <div style={logoStyles}>N</div>
      <NavItem
        icon="dashboard"
        label="Dashboard"
        isActive={currentView === 'dashboard'}
        onClick={() => setView('dashboard')}
      />
      <NavItem
        icon="hub"
        label="Workflow Editor"
        isActive={currentView === 'editor'}
        onClick={() => setView('editor')}
      />
      <NavItem
        icon="school"
        label="Learning Hub"
        isActive={currentView === 'learningHub'}
        onClick={() => setView('learningHub')}
      />
    </aside>
  );
};

export default Sidebar;
