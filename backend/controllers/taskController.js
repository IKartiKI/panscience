const Task = require("../models/Task");
const User = require("../models/User");

// Create a new task
const createTask = async (req, res) => {
  try {
    console.log("Create task request body:", req.body);
    console.log("User from request:", req.user);

    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    const createdBy = req.user.id; // From auth middleware

    // Validate required fields
    if (!title || !description || !dueDate) {
      return res.status(400).json({
        message: "Missing required fields",
        required: { title: !title, description: !description, dueDate: !dueDate }
      });
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate,
      assignedTo: assignedTo || createdBy, // If not assigned, assign to creator
      createdBy
    });

    console.log("Created task:", task);
    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ 
      message: "Error creating task", 
      error: err.message,
      details: err.stack
    });
  }
};

// Get all tasks (with filtering and sorting)
const getTasks = async (req, res) => {
  try {
    const { status, priority, sortBy = 'dueDate', sortOrder = 'asc' } = req.query;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    // Build query
    let query = {};
    if (!isAdmin) {
      query.$or = [
        { assignedTo: userId },
        { createdBy: userId }
      ];
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const tasks = await Task.find(query)
      .sort(sort)
      .populate('assignedTo', 'email')
      .populate('createdBy', 'email');

    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
};

// Get a single task
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'email')
      .populate('createdBy', 'email');

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user has permission to view the task
    if (req.user.role !== 'admin' && 
        task.assignedTo._id.toString() !== req.user.id && 
        task.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to view this task" });
    }

    res.json(task);
  } catch (err) {
    console.error("Get task error:", err);
    res.status(500).json({ message: "Error fetching task", error: err.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user has permission to update the task
    if (req.user.role !== 'admin' && 
        task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'email')
     .populate('createdBy', 'email');

    res.json(updatedTask);
  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user has permission to delete the task
    if (req.user.role !== 'admin' && 
        task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
}; 