const express = require('express');
const { validateTask, validateTaskUpdate } = require('../middleware/validation');

const router = express.Router();

// in memory storage for tasks
let tasks = [];
let nextId = 1;

// Get all tasks
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks'
    });
  }
});

// create a new task
router.post('/', validateTask, (req, res) => {
  try {
    const { title, description, priority = 'medium' } = req.body;

    const newTask = {
      id: nextId++,
      title,
      description,
      completed: false,
      createdAt: new Date(),
      priority
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Task created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create task'
    });
  }
});

// update a task
router.put('/:id', validateTaskUpdate, (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (Number.isNaN(taskId) || taskId < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task id'
      });
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    const { title, description, completed, priority } = req.body;

    // update only provided fields
    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;
    if (priority !== undefined) tasks[taskIndex].priority = priority;

    res.json({
      success: true,
      data: tasks[taskIndex],
      message: 'Task updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update task'
    });
  }
});

// delete a task
router.delete('/:id', (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (Number.isNaN(taskId) || taskId < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task id'
      });
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json({
      success: true,
      data: deletedTask,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete task'
    });
  }
});

// toggle task completion status
router.patch('/:id/toggle', (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (Number.isNaN(taskId) || taskId < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task id'
      });
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    res.json({
      success: true,
      data: tasks[taskIndex],
      message: `Task marked as ${tasks[taskIndex].completed ? 'completed' : 'incomplete'}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to toggle task status'
    });
  }
});

module.exports = router;
