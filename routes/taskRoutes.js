const express = require('express');
const router = express.Router();
const validateTask = require('../middleware/validateTask');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskAnalytics
} = require('../controllers/taskController');




router.post('/', validateTask, createTask);
router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/analytics', getTaskAnalytics);

module.exports = router;