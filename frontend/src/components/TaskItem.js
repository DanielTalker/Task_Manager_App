import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, onToggle, onEdit, onDelete, isActive }) {
  if (!task) return null;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
      <div className="task-header">
        <div className="task-priority">
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        <div className="task-actions">
          {/* edit button */}
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            title="Edit task"
          >
            ✏️
          </button>
          {/* delete button */}
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>

      <div className="task-footer">
        <div className="task-meta">
          <span className="task-date">
            Created: {formatDate(task.createdAt)}
          </span>
        </div>
        
        <div className="task-toggle">
          {/* toggle complete/pending */}
          <label className="toggle-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </label>
        </div>
      </div>

      {task.completed && (
        <div className="completion-overlay">
          <span className="completion-check">✓</span>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
