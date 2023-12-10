const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');
const cookieParser = require('cookie-parser');

// Middleware to authenticate all routes in this file
// router.use(cookieParser())
// router.use(authMiddleware);

// Get all tasks for the authenticated user
router.get('/', (req, res) => {
  // Assuming you have a User model with tasks as a subdocument
  

  // Fetch tasks for the authenticated user
  Task.find({})
    .then(tasks => res.json({ success: true, tasks }))
    .catch(error => res.status(500).json({ success: false, error: error.message }));
});


// Create a new task
router.post('/', (req, res) => {
  const { title, priority, dueDate, labels } = req.body;
  // const userId = req.user._id;

  const newTask = new Task({
    title,
    priority,
    dueDate,
    labels,
    
  });

  newTask.save()
    .then(task => res.status(201).json({ success: true, task }))
    .catch(error => res.status(500).json({ success: false, error: error.message }));
});

// Update a task by ID
router.put('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const { title, priority, dueDate, labels } = req.body;

  Task.findByIdAndUpdate(taskId, { title, priority, dueDate, labels }, { new: true })
    .then(updatedTask => res.json({ success: true, task: updatedTask }))
    .catch(error => res.status(500).json({ success: false, error: error.message }));
});

// Delete a task by ID
router.delete('/:taskId', (req, res) => {
  const taskId = req.params.taskId;

  Task.findByIdAndDelete(taskId)
    .then(deletedTask => res.json({ success: true, task: deletedTask }))
    .catch(error => res.status(500).json({ success: false, error: error.message }));
});

module.exports = router;
