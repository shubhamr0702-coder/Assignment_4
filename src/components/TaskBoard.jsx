import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './TaskBoard.css';

export default function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage('cipher_tasks', []);
  const [subtasks, setSubtasks] = useLocalStorage('cipher_subtasks', []);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [fadingTasks, setFadingTasks] = useState([]);

  const handleAddTask = (e) => {
    if (e.key === 'Enter' && newTaskTitle.trim()) {
      const newTask = { id: Date.now(), title: newTaskTitle, date: null, completed: false };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setSubtasks(subtasks.filter(s => s.parentId !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task.completed) {
      setFadingTasks([...fadingTasks, taskId]);
      setTimeout(() => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
        setFadingTasks(prev => prev.filter(id => id !== taskId));
      }, 400);
    } else {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: false } : t));
    }
  };

  const groupTasks = () => {
    const todayStr = new Date().toISOString().split('T');
    return tasks.reduce((acc, task) => {
      if (task.completed) acc.Completed.push(task);
      else if (!task.date) acc.NoDate.push(task);
      else if (task.date < todayStr) acc.Overdue.push(task);
      else if (task.date === todayStr) acc.Today.push(task);
      else acc.Upcoming.push(task);
      return acc;
    }, { Overdue: [], Today: [], Upcoming: [], NoDate: [], Completed: [] });
  };

  const grouped = groupTasks();

  const renderTaskList = (list, title) => {
    if (list.length === 0) return null;
    return (
      <div className="task-group">
        <h3>{title}</h3>
        {list.map(task => {
          const taskSubtasks = subtasks.filter(s => s.parentId === task.id);
          const completedSubtasks = taskSubtasks.filter(s => s.completed).length;
          const isFading = fadingTasks.includes(task.id);

          return (
            <div key={task.id} className={`task-item ${isFading ? 'fade-out' : ''}`}>
              <div className="task-header">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTaskCompletion(task.id)} 
                />
                <span className={task.completed || isFading ? 'strikethrough' : ''}>
                  {task.title}
                </span>
                {taskSubtasks.length > 0 && (
                  <span className="badge">{completedSubtasks}/{taskSubtasks.length}</span>
                )}
                <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="task-board">
      <h2>TaskBoard</h2>
      <input 
        type="text" 
        placeholder="Quick add task... (Press Enter)" 
        value={newTaskTitle} 
        onChange={(e) => setNewTaskTitle(e.target.value)} 
        onKeyDown={handleAddTask} 
      />
      {renderTaskList(grouped.Overdue, "Overdue")}
      {renderTaskList(grouped.Today, "Today")}
      {renderTaskList(grouped.Upcoming, "Upcoming")}
      {renderTaskList(grouped.NoDate, "No Date")}
      {renderTaskList(grouped.Completed, "Completed")}
    </div>
  );
}