const mongoose = require('mongoose');

const taskSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "completed"],
        default: "todo",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
    }
});

module.exports = mongoose.model("Task", taskSchema);