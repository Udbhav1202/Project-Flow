const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByProject
} = require("../controllers/taskController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createTask);
router.get("/:projectId", auth, getTasksByProject);

module.exports = router;
