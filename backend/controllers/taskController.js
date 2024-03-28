const Task = require('../models/taskmodels');

// Create a new task
const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { userId } = req;
        const task = new Task({ title, description, userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all tasks
const getAllTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort, order, search } = req.query;
        let query = {};

        // Handle search
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Handle sorting
        let sortCriteria = {};
        if (sort && (order === 'asc' || order === 'desc')) {
            sortCriteria[sort] = order === 'asc' ? 1 : -1;
        }

        query.userId = req.userId;

        // Pagination
        const tasks = await Task.find(query)
            .sort(sortCriteria)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task by ID
const updateTaskById = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task by ID
const deleteTaskById = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
};
