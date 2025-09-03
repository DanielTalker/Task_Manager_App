import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import ApiService from './services/api';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState(''); // search input
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [tasks, filter, searchTerm]);

  // fetch tasks from backend
  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ApiService.getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError('Failed to load tasks. Please check if the backend server is running.');
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // apply filter and search
  const applyFilter = () => {
    let filtered = [...tasks];

    switch (filter) {
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      case 'pending':
        filtered = tasks.filter(task => !task.completed);
        break;
      default:
        filtered = tasks;
    }

    // apply search
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(task =>
        (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTasks(filtered);
  };

  // create new task
  const handleCreateTask = async (taskData) => {
    try {
      const response = await ApiService.createTask(taskData);
      setTasks(prev => [...prev, response.data]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  // update task
  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await ApiService.updateTask(id, updates);
      setTasks(prev => prev.map(task =>
        task.id === id ? response.data : task
      ));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  // delete task
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await ApiService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  // toggle task completed status
  const handleToggleTask = async (id) => {
    try {
      const response = await ApiService.toggleTask(id);
      setTasks(prev => prev.map(task =>
        task.id === id ? response.data : task
      ));
    } catch (err) {
      setError('Failed to toggle task');
      console.error('Error toggling task:', err);
    }
  };

  // set task to edit
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <button
          className="add-task-btn"
          onClick={() => setShowForm(true)}
          disabled={isLoading}
        >
          ✚ Add New Task
        </button>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className="app-main">
        <TaskFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={{
            all: tasks.length,
            completed: tasks.filter(t => t.completed).length,
            pending: tasks.filter(t => !t.completed).length
          }}
        />

        {/* search bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ?
              (updates) => handleUpdateTask(editingTask.id, updates) :
              handleCreateTask
            }
            onCancel={handleCancelEdit}
            isEditing={!!editingTask}
          />
        )}

        {isLoading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            filter={filter}
          />
        )}
      </main>
    </div>
  );
}

export default App;
