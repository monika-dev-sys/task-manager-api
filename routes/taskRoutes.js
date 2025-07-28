const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();

    // Format response to exclude _id and __v
    const { _id, __v, ...taskData } = newTask.toObject();
    res.status(201).json(taskData);
  } catch (err) {
    res.status(400).json({ message: 'Task creation failed', error: err.message });
  }
});

// Get all tasks with optional status filter and sorting
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const sort = {};
    if (req.query.sortBy) {
      const field = req.query.sortBy;
      sort[field.replace('-', '')] = field.startsWith('-') ? -1 : 1;
    }

    // Use lean() for plain objects and remove _id/__v manually
    const tasks = await Task.find(filter).sort(sort).lean();
    const result = tasks.map(({ _id, __v, ...rest }) => rest);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a task by ID
router.get('/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  try {
    const task = await Task.findOne({ id: taskId }).lean();
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { _id, __v, ...taskData } = task;
    res.json(taskData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate({ id: taskId }, req.body, {
      new: true,
      runValidators: true
    }).lean();

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    const { _id, __v, ...taskData } = updatedTask;
    res.json(taskData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  try {
    const deletedTask = await Task.findOneAndDelete({ id: taskId }).lean();
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    const { _id, __v, ...taskData } = deletedTask;
    res.json({ message: 'Task deleted successfully', task: taskData });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
