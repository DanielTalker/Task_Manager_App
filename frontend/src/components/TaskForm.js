import React, { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ task, onSubmit, onCancel, isEditing }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (isEditing && task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium'
      });
    }
    setErrors({});
  }, [task, isEditing]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    // description is optional – only validate length if provided
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (!['low', 'medium', 'high'].includes(formData.priority)) {
      newErrors.priority = 'Please select a valid priority';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <div className="task-form-header">
          <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
          <button 
            className="close-btn"
            onClick={onCancel}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter task title..."
              maxLength={100}
            />
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Enter task description (optional)..."
              rows={4}
              maxLength={500}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={`form-select ${errors.priority ? 'error' : ''}`}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            {errors.priority && (
              <span className="error-message">{errors.priority}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
