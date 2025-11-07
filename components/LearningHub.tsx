import React, { useState, useEffect, useMemo } from 'react';
import { LearningPath, Concept, ToastMessage } from '../types';

// --- MOCK DATA ---
const concepts: Concept[] = [
  { id: 'c1', title: 'Triggers', description: 'Iniciam workflows baseados em eventos.', category: 'Iniciante' },
  { id: 'c2', title: 'Fluxo de Dados', description: 'Como a informação passa entre os agentes.', category: 'Iniciante' },
  { id: 'c3', title: 'Orquestração', description: 'Conectando múltiplos agentes em sequência.', category: 'Intermediário' },
  { id: 'c4', title: 'Lógica Condicional', description: 'Executando ações baseadas em regras.', category: 'Intermediário' },
  { id: 'c5', title: 'Agentes de IA', description: 'Utilizando LLMs para tarefas complexas.', category: 'Avançado' },
  { id: 'c6', title: 'RAG', description: 'Melhorando a IA com dados externos.', category: 'Avançado' },
  { id: 'c7', title: 'Arquitetura Autônoma', description: 'Criando sistemas que operam sozinhos.', category: 'Expert' },
  { id: 'c8', title: 'Otimização', description: 'Melhorando a eficiência dos workflows.', category: 'Expert' },
];

const learningPaths: LearningPath[] = [
  { id: 'p1', level: 'Iniciante', title: 'Fundamentos da Automação', description: 'Aprenda o básico sobre triggers e fluxo de dados.', duration: '45 min', concepts: ['c1', 'c2'], color: '#4CAF50' },
  { id: 'p2', level: 'Intermediário', title: 'Construindo Workflows', description: 'Domine a arte de conectar e controlar agentes.', duration: '1h 30min', concepts: ['c3', 'c4'], color: '#2196F3' },
  { id: 'p3', level: 'Avançado', title: 'Inteligência Artificial Aplicada', description: 'Incorpore IA e RAG em seus projetos.', duration: '2h', concepts: ['c5', 'c6'], color: '#FF9800' },
  { id: 'p4', level: 'Expert', title: 'Sistemas Autônomos', description: 'Projete arquiteturas complexas e otimizadas.', duration: '3h', concepts: ['c7', 'c8'], color: '#E91E63' },
];

interface LearningHubProps {
    setToastMessages: React.Dispatch<React.SetStateAction<ToastMessage[]>>;
}

// --- SUB-COMPONENTS (defined in the same file for simplicity) ---

const ProgressTracker = ({ completedCount, totalCount }: { completedCount: number, totalCount: number }) => {
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    return (
        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)', marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px', fontWeight: 500 }}>Seu Progresso</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                    <svg width="100" height="100" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#333" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#gradient)" strokeWidth="3" strokeDasharray={`${progress}, 100`} strokeLinecap="round" />
                        <defs><linearGradient id="gradient"><stop offset="0%" stopColor="#8e2de2" /><stop offset="100%" stopColor="#4a00e0" /></linearGradient></defs>
                    </svg>
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2rem', fontWeight: 'bold' }}>{Math.round(progress)}%</span>
                </div>
                <div>
                    <div style={{ fontSize: '1.5rem' }}>{completedCount} / {totalCount} Conceitos</div>
                    <div style={{ color: 'var(--color-text-muted)' }}>Continue aprendendo para se tornar um expert!</div>
                </div>
            </div>
        </div>
    );
}

const PathwayCard = ({ path }: { path: LearningPath }) => (
    <div style={{ background: 'var(--color-surface-2)', padding: '20px', borderRadius: 'var(--border-radius)', borderLeft: `4px solid ${path.color}`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ color: path.color, fontWeight: 'bold' }}>{path.level}</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>{path.title}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', flexGrow: 1 }}>{path.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{path.duration}</span>
            <button style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Iniciar Trilha</button>
        </div>
    </div>
);

const ConceptCard = ({ concept, isCompleted, onLearn }: { concept: Concept, isCompleted: boolean, onLearn: () => void }) => (
    <div style={{ background: 'var(--color-surface-2)', padding: '20px', borderRadius: 'var(--border-radius)', display: 'flex', flexDirection: 'column', gap: '10px', opacity: isCompleted ? 0.7 : 1 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }}>{concept.title}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', flexGrow: 1 }}>{concept.description}</p>
        <button onClick={onLearn} disabled={isCompleted}>{isCompleted ? 'Dominado ✓' : 'Aprender'}</button>
    </div>
);


const LearningHub = ({ setToastMessages }: LearningHubProps) => {
    const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('nexusCompletedConcepts');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    useEffect(() => {
        localStorage.setItem('nexusCompletedConcepts', JSON.stringify(Array.from(completedConcepts)));
    }, [completedConcepts]);

    const handleLearnConcept = (conceptId: string) => {
        if (!completedConcepts.has(conceptId)) {
            setCompletedConcepts(prev => new Set(prev).add(conceptId));
            const concept = concepts.find(c => c.id === conceptId);
            setToastMessages(prev => [...prev, { id: Date.now(), message: `Conceito Dominado: ${concept?.title}!`, type: 'success' }]);
        }
    };
    
    return (
        <div style={{ padding: '30px', height: '100%', overflowY: 'auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '30px', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nexus Learning Hub</h1>
            
            <ProgressTracker completedCount={completedConcepts.size} totalCount={concepts.length} />

            <section>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>Trilhas de Aprendizagem</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {learningPaths.map(path => <PathwayCard key={path.id} path={path} />)}
                </div>
            </section>

            <section style={{ marginTop: '40px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>Explorador de Conceitos</h2>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    {concepts.map(concept => (
                        <ConceptCard 
                            key={concept.id}
                            concept={concept} 
                            isCompleted={completedConcepts.has(concept.id)}
                            onLearn={() => handleLearnConcept(concept.id)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LearningHub;
