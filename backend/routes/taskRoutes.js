const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById } = require('../controllers/taskController');

// POST route to add a new task
router.post('/', addTask);

// GET route to fetch all tasks
router.get('/', getAllTasks);

// GET route to fetch a task by ID
router.get('/:id', getTaskById);

// PUT route to update a task by ID
router.put('/:id', updateTaskById);

// DELETE route to delete a task by ID
router.delete('/:id', deleteTaskById);

module.exports = router;
