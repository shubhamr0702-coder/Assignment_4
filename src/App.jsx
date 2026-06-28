// src/App.jsx
import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskBoard from './components/TaskBoard';
import GoalTracker from './components/GoalTracker';
import FocusTimer from './components/FocusTimer';
import MoodBoard from './components/MoodBoard';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useLocalStorage('cipher_active_section', 'dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <TaskBoard />;
      case 'goals': return <GoalTracker />;
      case 'focus': return <FocusTimer />;
      case 'mood': return <MoodBoard />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tasks', label: 'Task Board' },
    { id: 'goals', label: 'Goal Tracker' },
    { id: 'focus', label: 'Focus Timer' },
    { id: 'mood', label: 'Mood Board' }
  ];

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>Cipher MVP</h2>
        <ul className="nav-list">
          {navItems.map(item => (
            <li key={item.id}>
              <button 
                className={`nav-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;