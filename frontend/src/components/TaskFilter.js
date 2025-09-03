import React from 'react';
import '../styles/TaskFilter.css';

function TaskFilter({ currentFilter, onFilterChange, taskCounts }) {
  const filters = [
    {
      key: 'all',
      label: 'All Tasks',
      count: taskCounts.all,
      icon: '📋'
    },
    {
      key: 'pending',
      label: 'Pending',
      count: taskCounts.pending,
      icon: '⏳'
    },
    {
      key: 'completed',
      label: 'Completed',
      count: taskCounts.completed,
      icon: '✅'
    }
  ];

  return (
    <div className="task-filter">
      <div className="filter-tabs">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-tab ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
            aria-label={`Show ${filter.label.toLowerCase()}`}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">{filter.count}</span>
          </button>
        ))}
      </div>
      
    </div>
  );
}

export default TaskFilter;
