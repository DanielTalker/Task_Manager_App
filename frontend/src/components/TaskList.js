import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks, onToggle, onEdit, onDelete, filter }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // reset to first task when tasks change
  useEffect(() => {
    // setCurrentIndex(0);
    // if the list is empty - stay at 0
    if (tasks.length === 0) {
      setCurrentIndex(0);
      return;
    }
    // if the current index is greater than the new maximum index
    setCurrentIndex((i) => Math.min(i, tasks.length - 1));
  }, [tasks]);

  const handleNext = () => {
    if (tasks.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % tasks.length);
  };

  const handlePrev = () => {
    if (tasks.length <= 1) return;
    setCurrentIndex(prev => prev === 0 ? tasks.length - 1 : prev - 1);
  };

  if (tasks.length === 0) {
  let message = 'No tasks found';
  let subMessage = '';

  if (filter === 'completed') {
    message = 'No completed tasks';
  } else if (filter === 'pending') {
    message = 'No pending tasks';
  } else {
    subMessage = 'Create your first task to get started!';
  }

  return (
    <div className="task-list-empty">
      <div className="empty-state">
        <h3>{message}</h3>
        {subMessage && <p>{subMessage}</p>}
      </div>
    </div>
  );
}

  // additional protection: safeIndex computers
  const safeIndex = Math.min(currentIndex, tasks.length - 1);
  const task = tasks[safeIndex];
  if (!task) return null;

  return (
    <div className="task-carousel">
      <div className="carousel-container">
        <button 
          className="carousel-btn carousel-btn-prev"
          onClick={handlePrev}
          disabled={tasks.length <= 1}
          aria-label="Previous task"
        >
          ‹
        </button>

        <div className="carousel-track">
          <TaskItem
            // task={tasks[currentIndex]}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            isActive={true}
          />
        </div>

        <button 
          className="carousel-btn carousel-btn-next"
          onClick={handleNext}
          disabled={tasks.length <= 1}
          aria-label="Next task"
        >
          ›
        </button>
      </div>

      {tasks.length > 1 && (
        <div className="carousel-indicators">
          {tasks.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}

              aria-label={`Go to task ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="carousel-info">
        <span className="task-counter">
          {tasks.length > 0 ? `${currentIndex + 1} of ${tasks.length}` : '0 of 0'}
        </span>
      </div>
    </div>
  );
}

export default TaskList;
