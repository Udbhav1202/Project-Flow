const Task = require('../models/taskModel');
const Project = require("../models/Project");

const createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can create tasks" });
    }
    
    const task = await Task.create({
      title,
      projectId,
      assignedTo
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasksByProject = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Task.countDocuments({
      projectId: req.params.projectId
    });


    //
    const tasks = await Task.find({
      projectId: req.params.projectId
    })
    .skip(skip)
    .limit(limit)
    .populate("assignedTo", "name email")
    .populate("projectId", "title");

    res.json({
      totalTasks: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      tasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
    //
    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createTask, getTasksByProject, updateTaskStatus };