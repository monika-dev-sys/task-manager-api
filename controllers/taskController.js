const Task = require('../models/Task');


const getTaskAnalytics = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const pendingTasks = await Task.countDocuments({ status: 'pending' });
    const highPriorityTasks = await Task.countDocuments({ priority: 'high' });

    const workTasks = await Task.countDocuments({ category: 'work' });
    const studyTasks = await Task.countDocuments({ category: 'study' });
    const personalTasks = await Task.countDocuments({ category: 'personal' });
    const healthTasks = await Task.countDocuments({ category: 'health' });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      highPriorityTasks,
      categories: {
        work: workTasks,
        study: studyTasks,
        personal: personalTasks,
        health: healthTasks
      }
    });

  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};
// Create task
const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();

    const { _id, __v, ...taskData } = newTask.toObject();
    res.status(201).json(taskData);
  } catch (err) {
    res.status(400).json({
      message: 'Task creation failed',
      error: err.message
    });
  }
};

// Get all tasks with filters + search + sorting + pagination
const getAllTasks = async (req, res) => {
  try {
    const filter = {};

    // Filters
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.category) filter.category = req.query.category;

    // Search
    if (req.query.search) {
      filter.title = {
        $regex: req.query.search,
        $options: 'i'
      };
    }

    // Sorting
    const sort = {};
    if (req.query.sortBy) {
      const field = req.query.sortBy;
      sort[field.replace('-', '')] = field.startsWith('-') ? -1 : 1;
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const result = tasks.map(({ _id, __v, ...rest }) => rest);

    res.json({
      totalTasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      tasks: result
    });

  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  const taskId = parseInt(req.params.id);

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  try {
    const task = await Task.findOne({ id: taskId }).lean();

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { _id, __v, ...taskData } = task;
    res.json(taskData);
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  const taskId = parseInt(req.params.id);

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id: taskId },
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).lean();

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { _id, __v, ...taskData } = updatedTask;
    res.json(taskData);
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const taskId = parseInt(req.params.id);

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  try {
    const deletedTask = await Task.findOneAndDelete({ id: taskId }).lean();

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { _id, __v, ...taskData } = deletedTask;

    res.json({
      message: 'Task deleted successfully',
      task: taskData
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskAnalytics
};