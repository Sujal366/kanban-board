const express = require('express');
const router = express.Router();
const Task = require("../models/tasks");

// GET ALL TASKS
router.get("/", async (req, res)=>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({error: "Error fetching tasks"});
    }
})

// CREATE A TASK
router.post("/", async (req, res)=>{
    const { title, description, status, priority } = req.body;
    if (!title){
        return res.status(400).json({error: "Title is required"});
    }
    try{
        const newTask = new Task({title: title, description: description, status: status, priority: priority});
        await newTask.save();
        res.status(201).json({message: "Task created successfully"});
    }
    catch(error){
        res.status(500).json({error: "Error creating task"});
    }
})

// UPDATE TASK STATUS
router.put("/updateStatus/:id", async (req, res)=>{
    try{
        const { status, newTimestamp } = req.body;
        const existingTask = await Task.findById(req.params.id);
        if (!existingTask) {
          return res.status(404).json({ error: "Task not found" });
        }
        const task = await Task.findByIdAndUpdate(
          req.params.id,
          { status: status, timestamp: newTimestamp },
          { new: true }
        );
        res.json({message: "Task updated successfully"});
    }
    catch(error){
        res.status(500).json({error: "Error updating task"});
    }
})

// UPDATE TASK TITLE, DESCRIPTION AND PRIORITY
router.put("/updateDetails/:id", async (req, res)=>{
    try{
        const {title, description, priority, newTimestamp} = req.body;
        if (!title && !description){
            return res.status(400).json({error: "Title is required"});
        }
        const existingTask = await Task.findById(req.params.id);
        if (!existingTask) {
          return res.status(404).json({ error: "Task not found" });
        }
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {title: title || existingTask.title, description: description || existingTask.description, priority: priority || existingTask.priority, timestamp: newTimestamp},
            {new: true}
        );
        res.json({message: "Task updated successfully"});
    }
    catch(error){
        res.status(500).json({error: "Error updating task"});
    }
})

// DELETE A TASK
router.delete("/:id", async (req, res)=>{
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: "Task deleted successfully"});
    }
    catch(error){
        res.status(500).json({error: "Error deleting task"});
    }
})

module.exports = router;