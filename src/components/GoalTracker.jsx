import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function GoalTracker() {
  const [goals, setGoals] = useLocalStorage('cipher_goals', []);
  const [newGoalTitle, setNewGoalTitle] = useState('');

  const handleAddGoal = (e) => {
    if (e.key === 'Enter' && newGoalTitle.trim()) {
      setGoals([...goals, { id: Date.now(), title: newGoalTitle, progress: 0 }]);
      setNewGoalTitle('');
    }
  };

  const updateProgress = (id, delta) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const newProgress = Math.min(100, Math.max(0, g.progress + delta));
        return { ...g, progress: newProgress };
      }
      return g;
    }));
  };

  return (
    <div className="goal-tracker">
      <h2>Goals</h2>
      <input 
        type="text" 
        placeholder="New Goal... (Press Enter)" 
        value={newGoalTitle} 
        onChange={(e) => setNewGoalTitle(e.target.value)} 
        onKeyDown={handleAddGoal} 
      />
      <div className="goal-list" style={{ marginTop: '20px' }}>
        {goals.map(goal => (
          <div key={goal.id} className="goal-card" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
            <h4>{goal.title}</h4>
            <div className="progress-bar-container" style={{ background: '#222', borderRadius: '4px', overflow: 'hidden', margin: '10px 0' }}>
              <div className="progress-bar" style={{ width: `${goal.progress}%`, background: '#4CAF50', height: '10px', transition: 'width 0.2s' }} />
            </div>
            <div className="controls" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button onClick={() => updateProgress(goal.id, -10)}>-10%</button>
              <span>{goal.progress}%</span>
              <button onClick={() => updateProgress(goal.id, 10)}>+10%</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}