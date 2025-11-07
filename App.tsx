import React, { useState, useCallback, useEffect } from 'react';
import { Workflow, NodeData, Position, AgentType, View, ToastMessage } from './types';
import { enhanceNodeDetails } from './services/geminiService';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import AgentPalette from './components/AgentPalette';
import TipsPanel from './components/TipsPanel';
import ZoomControls from './components/ZoomControls';
import NodeModal from './components/NodeModal';
import Dashboard from './components/Dashboard';
import LearningHub from './components/LearningHub';

// Initial state for the workflow
const initialWorkflow: Workflow = {
  id: 'wf-1',
  name: 'My First AI Workflow',
  nodes: [
    { id: 'node-1', type: 'Trigger', label: 'User Signup', description: 'Fires when a new user signs up.', position: { x: 50, y: 150 } },
    { id: 'node-2', type: 'AI', label: 'Generate Welcome Email', description: 'Uses AI to create a personalized welcome email.', position: { x: 350, y: 150 } },
  ],
  edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
};

const appStyles: React.CSSProperties = {
  display: 'flex',
  height: '100vh',
  width: '100%',
  backgroundColor: 'var(--color-background)',
};

const mainContentStyles: React.CSSProperties = {
  flex: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};

// Toast Component
const Toast = ({ message, onDismiss }: { message: ToastMessage, onDismiss: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            borderRadius: 'var(--border-radius)',
            background: message.type === 'success' ? 'var(--gradient-primary)' : '#D32F2F',
            color: 'white',
            boxShadow: 'var(--shadow)',
            zIndex: 2000,
            fontSize: '0.9rem',
        }}>
            {message.message}
        </div>
    );
};

const App = () => {
  const [workflow, setWorkflow] = useState<Workflow>(initialWorkflow);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const [view, setView] = useState<View>('dashboard');
  const [toastMessages, setToastMessages] = useState<ToastMessage[]>([]);

  const handleNodeMove = useCallback((id: string, position: Position) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => n.id === id ? { ...n, position } : n),
    }));
  }, []);

  const handleNodeDoubleClick = (node: NodeData) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const handleSaveNode = (updatedNode: NodeData) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => n.id === updatedNode.id ? updatedNode : n),
    }));
    setSelectedNode(null);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prev => Math.max(0.2, prev + (direction === 'in' ? 0.1 : -0.1)));
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
    }
  };

  const handleCanvasMouseUp = () => setIsDragging(false);

  const handleCanvasDrag = (e: React.MouseEvent) => {
    if (isDragging) {
      setViewPosition(prev => ({
        x: prev.x + e.movementX / scale,
        y: prev.y + e.movementY / scale,
      }));
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const agentData = JSON.parse(event.dataTransfer.getData('application/nexus-ai-agent'));
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale - viewPosition.x;
    const y = (event.clientY - rect.top) / scale - viewPosition.y;

    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      type: agentData.type,
      label: agentData.label,
      description: `A new ${agentData.label} agent.`,
      position: { x, y },
    };
    setWorkflow(prev => ({ ...prev, nodes: [...prev.nodes, newNode] }));
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  
  const removeToast = (id: number) => {
      setToastMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const renderView = () => {
    switch(view) {
      case 'dashboard':
        return <Dashboard setView={setView} />;
      case 'learningHub':
        return <LearningHub setToastMessages={setToastMessages} />;
      case 'editor':
        return (
          <>
            <AgentPalette />
            <Canvas
              workflow={workflow}
              scale={scale}
              viewPosition={viewPosition}
              onNodeMove={handleNodeMove}
              handleNodeDoubleClick={handleNodeDoubleClick}
              handleCanvasDrag={handleCanvasDrag}
              handleCanvasMouseDown={handleCanvasMouseDown}
              handleCanvasMouseUp={handleCanvasMouseUp}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              setToastMessages={setToastMessages}
              selectedNodeId={isModalOpen ? selectedNode?.id : undefined}
            />
            <TipsPanel />
            <ZoomControls onZoom={handleZoom} scale={scale} />
          </>
        );
      default:
        return <Dashboard setView={setView} />;
    }
  }

  return (
    <div style={appStyles}>
      <Sidebar currentView={view} setView={setView} />
      <main style={mainContentStyles}>
        {renderView()}
      </main>
      
      {isModalOpen && (
        <NodeModal
          node={selectedNode}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNode}
          onEnhance={enhanceNodeDetails}
          setToastMessages={setToastMessages}
        />
      )}
      
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }}>
          {toastMessages.map(msg => (
              <Toast key={msg.id} message={msg} onDismiss={() => removeToast(msg.id)} />
          ))}
      </div>
    </div>
  );
};

export default App;