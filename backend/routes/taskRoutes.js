const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByProject,
  updateTaskStatus
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasksByProject);

router.patch("/:id/status", protect, updateTaskStatus);



module.exports = router;
