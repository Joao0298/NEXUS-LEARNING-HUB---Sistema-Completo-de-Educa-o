import React from 'react';
import { View } from '../types';

interface DashboardProps {
  setView: (view: View) => void;
}

const dashboardStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '40px',
  textAlign: 'center',
  gap: '40px',
};

const headerStyles: React.CSSProperties = {
  fontSize: '3rem',
  fontWeight: 700,
  color: 'var(--color-text)',
};

const subHeaderStyles: React.CSSProperties = {
  fontSize: '1.2rem',
  color: 'var(--color-text-muted)',
  maxWidth: '600px',
  lineHeight: '1.6',
};

const cardContainerStyles: React.CSSProperties = {
  display: 'flex',
  gap: '30px',
  marginTop: '20px',
};

const actionCardStyles: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  padding: '30px',
  borderRadius: 'var(--border-radius)',
  border: '1px solid var(--color-border)',
  width: '300px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
};

const cardIconStyles: React.CSSProperties = {
  fontSize: '48px',
  background: 'var(--gradient-primary)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '15px'
}

const cardTitleStyles: React.CSSProperties = {
    fontSize: '1.4rem',
    fontWeight: 500,
    marginBottom: '10px'
}

const cardDescriptionStyles: React.CSSProperties = {
    fontSize: '0.9rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.5'
}

const Dashboard = ({ setView }: DashboardProps) => {
  return (
    <div style={dashboardStyles}>
      <h1 style={headerStyles}>Bem-vindo ao Nexus Learning Hub</h1>
      <p style={subHeaderStyles}>
        A plataforma integrada para aprender, projetar e otimizar fluxos de trabalho inteligentes com o poder da IA.
      </p>
      <div style={cardContainerStyles}>
        <div 
          style={actionCardStyles}
          onClick={() => setView('learningHub')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
        >
          <div style={cardIconStyles} className="material-icons">school</div>
          <h2 style={cardTitleStyles}>Jornada de Aprendizagem</h2>
          <p style={cardDescriptionStyles}>Comece do zero e torne-se um especialista em automação com nossos caminhos de aprendizagem guiados.</p>
        </div>
        <div 
          style={actionCardStyles}
          onClick={() => setView('editor')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
        >
          <div style={cardIconStyles} className="material-icons">hub</div>
          <h2 style={cardTitleStyles}>Editor de Workflow</h2>
          <p style={cardDescriptionStyles}>Vá direto para a ação. Crie, conecte e automatize agentes de IA em nossa tela visual.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
