const Task = require('../models/taskModel');
const Project = require("../models/Project");
const AppError = require("../utils/AppError");

const createTask = async (req, res, next) => {
  try {
    const { title, projectId, assignedTo } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    if (project.createdBy.toString() !== req.user.id) {
      throw new AppError("Only owner can create tasks", 403);
    }
    
    const task = await Task.create({
      title,
      projectId,
      assignedTo
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTasksByProject = async (req, res, next) => {
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
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["todo", "in-progress", "done"];

    if (!allowedStatus.includes(status)) {
      throw new AppError("Invalid status value", 400);
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    if (task.assignedTo.toString() !== req.user.id) {
      throw new AppError("Only assigned user can update task status", 403);
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};



module.exports = { createTask, getTasksByProject, updateTaskStatus };