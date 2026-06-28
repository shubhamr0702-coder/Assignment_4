import React, { useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function FocusTimer() {
  const { secondsRemaining, isRunning, start, pause, reset } = useTimer(1500);
  const [tasks] = useLocalStorage('cipher_tasks', []);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const incompleteTasks = tasks.filter(t => !t.completed);
  const selectedTask = tasks.find(t => t.id === Number(selectedTaskId));

  return (
    <div className="focus-timer">
      <h2>Focus Mode</h2>

      <select 
        value={selectedTaskId} 
        onChange={(e) => setSelectedTaskId(e.target.value)}
        disabled={isRunning}
        style={{ padding: '8px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', marginBottom: '15px' }}
      >
        <option value="">-- Select a task to focus on --</option>
        {incompleteTasks.map(t => (
          <option key={t.id} value={t.id}>{t.title}</option>
        ))}
      </select>

      {isRunning && selectedTask && (
        <h3 className="focusing-text" style={{ color: '#a855f7' }}>Focusing on: {selectedTask.title}</h3>
      )}

      <div className="timer-display" style={{ fontSize: '4rem', margin: '20px 0', fontFamily: 'monospace' }}>
        {formatTime(secondsRemaining)}
      </div>

      <div className="timer-controls" style={{ display: 'flex', gap: '10px' }}>
        {!isRunning ? (
          <button onClick={start} style={{ padding: '10px 20px' }}>Start</button>
        ) : (
          <button onClick={pause} style={{ padding: '10px 20px' }}>Pause</button>
        )}
        <button onClick={() => reset(1500)} style={{ padding: '10px 20px' }}>Reset</button>
      </div>
    </div>
  );
}