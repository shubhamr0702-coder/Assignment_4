import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Dashboard() {
  const [tasks] = useLocalStorage('cipher_tasks', []);
  const [goals] = useLocalStorage('cipher_goals', []);
  const [moodItems] = useLocalStorage('cipher_moodboard', []);

  // Compute Task Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Compute Goal Stats
  const totalGoals = goals.length;
  const avgGoalProgress = totalGoals > 0 
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / totalGoals) 
    : 0;

  return (
    <div className="dashboard-view" style={{ maxWidth: '900px' }}>
      <h2 style={{ marginBottom: '8px', fontSize: '2rem' }}>Workspace Overview</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>A bird's-eye view of your productivity metrics.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        
        {/* Task Completion Metrics Card */}
        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-muted)', fontWeight: '500' }}>Task Completion</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-purple)', fontFamily: 'monospace' }}>
            {taskCompletionRate}%
          </div>
          <p style={{ margin: '12px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {completedTasks} of {totalTasks} items resolved ({pendingTasks} pending)
          </p>
        </div>

        {/* Macro Goals Progress Card */}
        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-muted)', fontWeight: '500' }}>Average Goal Progress</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-green)', fontFamily: 'monospace' }}>
            {avgGoalProgress}%
          </div>
          <div className="mini-progress-track" style={{ background: 'var(--bg-input)', height: '6px', borderRadius: '3px', marginTop: '16px', overflow: 'hidden' }}>
            <div style={{ width: `${avgGoalProgress}%`, background: 'var(--accent-green)', height: '100%', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Curation Metrics Card */}
        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-muted)', fontWeight: '500' }}>Moodboard Items</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#eab308', fontFamily: 'monospace' }}>
            {moodItems.length}
          </div>
          <p style={{ margin: '12px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Visual inspirations saved in storage
          </p>
        </div>

      </div>
    </div>
  );
}