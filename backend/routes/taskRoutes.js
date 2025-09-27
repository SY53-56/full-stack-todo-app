const express = require("express");
const Task = require("../models/task");
const Routes = express.Router();
const {authenticateToken} = require("../middleware"); // correct spelling


// Get all tasks for logged-in user
Routes.get("/api",authenticateToken ,async (req, res) => {
  try {
    const todo = await Task.find({userId: req.user.id});
    res.json(todo);
  } catch (e) {
    console.error(e, "error");
    res.status(500).json({ error: "Server error" });
  }
});

// Add new task
Routes.post("/api/addTask",authenticateToken, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user.id, // ✅ ensure task belongs to logged-in user
    });
    await task.save();
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Update task
Routes.put("/api/task/:id",authenticateToken,async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    // ✅ only owner can update
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updateTask);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete task
Routes.delete("/api/task/:id", authenticateToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    // ✅ only owner can delete
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = Routes;
