const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

// console.log('Booting server.js...');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/tasks', tasksRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

// error handler
app.use(errorHandler);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;