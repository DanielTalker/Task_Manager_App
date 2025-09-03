// Input validation middleware for tasks

const validateTask = (req, res, next) => {
  const { title, description, priority } = req.body;
  const errors = [];

  // validate title
  if (!title || typeof title !== 'string') {
    errors.push('Title is required and must be a string');
  } else if (title.trim().length === 0) {
    errors.push('Title cannot be empty');
  } else if (title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  // validate description (may be empty string)
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } 
  }

  // validate priority
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be one of: low, medium, high');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // trim strings
  req.body.title = title.trim();
  if (description !== undefined) {
    req.body.description = description.trim();
  }
  next();
};

const validateTaskUpdate = (req, res, next) => {
  const { title, description, completed, priority } = req.body;
  const errors = [];

  // check if at least one field is provided
  if (
    title === undefined &&
    description === undefined &&
    completed === undefined &&
    priority === undefined
  ) {
    return res.status(400).json({
      success: false,
      error: 'At least one field must be provided for update'
    });
  }

  // validate title (if provided)
  if (title !== undefined) {
    if (typeof title !== 'string') {
      errors.push('Title must be a string');
    } else if (title.trim().length === 0) {
      errors.push('Title cannot be empty');
    } else if (title.length > 100) {
      errors.push('Title must be less than 100 characters');
    }
  }

  // validate description (if provided, may be empty string)
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } 
  }

  // validate completed
  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push('Completed must be a boolean');
  }

  // validate priority
  if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be one of: low, medium, high');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // trim strings if provided
  if (title !== undefined) req.body.title = title.trim();
  if (description !== undefined) req.body.description = description.trim();

  next();
};

module.exports = {
  validateTask,
  validateTaskUpdate
};
