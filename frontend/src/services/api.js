// API functions for communicating with backend

const BASE = 'http://localhost:4000/api/tasks';

// Get all tasks from server
async function getTasks() {
  try {
    const response = await fetch(BASE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get tasks:', error);
    throw error;
  }
}

// Create a new task
async function createTask(task) {
  try {
    const response = await fetch(BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
}

// Update an existing task
async function updateTask(id, updates) {
  try {
    const response = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    const response = await fetch(`${BASE}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
}

// Toggle task completion status
async function toggleTask(id) {
  try {
    const response = await fetch(`${BASE}/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to toggle task:', error);
    throw error;
  }
}

const ApiService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
};

export default ApiService;
