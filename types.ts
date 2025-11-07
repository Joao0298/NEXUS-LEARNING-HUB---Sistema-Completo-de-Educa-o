
export interface Position {
  x: number;
  y: number;
}

export type AgentType =
  | 'Trigger'
  | 'Integration'
  | 'Logic'
  | 'AI'
  | 'Output';

export interface NodeData {
  id: string;
  type: AgentType;
  label: string;
  description: string;
  position: Position;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: NodeData[];
  edges: Edge[];
}

// New types for App Structure and Learning Hub
export type View = 'dashboard' | 'editor' | 'learningHub';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export interface Concept {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface LearningPath {
  id: string;
  level: string;
  title: string;
  description: string;
  duration: string;
  concepts: string[];
  color: string;
}
