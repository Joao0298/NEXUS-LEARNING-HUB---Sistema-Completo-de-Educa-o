import React, { useState, useEffect } from 'react';
import { NodeData, AgentType, ToastMessage } from '../types';

interface NodeModalProps {
  node: NodeData | null;
  onClose: () => void;
  onSave: (node: NodeData) => void;
  onEnhance: (label: string, description: string) => Promise<{ newLabel: string, newDescription: string }>;
  setToastMessages: React.Dispatch<React.SetStateAction<ToastMessage[]>>;
}

const agentTypes: AgentType[] = ['Trigger', 'Integration', 'Logic', 'AI', 'Output'];

const NodeModal = ({ node, onClose, onSave, onEnhance, setToastMessages }: NodeModalProps) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AgentType>('AI');
  const [isEnhancing, setIsEnhancing] = useState(false);

  useEffect(() => {
    if (node) {
      setLabel(node.label);
      setDescription(node.description);
      setType(node.type);
    }
  }, [node]);

  if (!node) return null;

  const handleSave = () => {
    if (node) {
      onSave({ ...node, label, description, type });
    }
    onClose();
  };

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
        const { newLabel, newDescription } = await onEnhance(label, description);
        setLabel(newLabel);
        setDescription(newDescription);
        setToastMessages(prev => [...prev, { id: Date.now(), message: 'Agente otimizado com IA!', type: 'success' }]);
    } catch(error) {
        console.error("Failed to enhance details:", error);
        setToastMessages(prev => [...prev, { id: Date.now(), message: 'Falha ao otimizar. Tente novamente.', type: 'error' }]);
    } finally {
        setIsEnhancing(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Agente</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        
        <label htmlFor="node-label">Rótulo</label>
        <input id="node-label" value={label} onChange={(e) => setLabel(e.target.value)} />
        
        <label htmlFor="node-description">Descrição</label>
        <textarea id="node-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        
        <label htmlFor="node-type">Tipo</label>
        <select id="node-type" value={type} onChange={(e) => setType(e.target.value as AgentType)}>
            {agentTypes.map(agentType => (
                <option key={agentType} value={agentType}>{agentType}</option>
            ))}
        </select>

        <button onClick={handleEnhance} disabled={isEnhancing || !label} style={{ marginTop: '10px' }}>
          {isEnhancing ? 'Otimizando...' : '✨ Otimizar com IA'}
        </button>

        <div className="modal-footer">
          <button onClick={onClose} style={{background: 'var(--color-surface-2)', color: 'var(--color-text)'}}>Cancelar</button>
          <button onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default NodeModal;
