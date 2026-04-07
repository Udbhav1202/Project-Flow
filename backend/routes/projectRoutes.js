const express = require("express");
const router = express.Router();

const {
  createProject,
  getMyProjects
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);

module.exports = router;
