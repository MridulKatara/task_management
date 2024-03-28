const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
