const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByProject,
  updateTaskStatus
} = require("../controllers/taskController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createTask);
router.get("/:projectId", auth, getTasksByProject);
router.patch("/:id/status", auth, updateTaskStatus);


module.exports = router;
