const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

// All routes are protected with auth middleware
router.use(auth);

// Task routes
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
