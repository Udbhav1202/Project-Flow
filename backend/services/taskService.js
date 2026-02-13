const Task = require("../models/taskModel");
const Project = require("../models/projectModel");
const AppError = require("../utils/AppError");

const createTaskService = async ({ title, projectId, assignedTo, userId }) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (project.createdBy.toString() !== userId) {
    throw new AppError("Only owner can create tasks", 403);
  }

  const task = await Task.create({
    title,
    projectId,
    assignedTo,
  });

  return task;
};

const getTasksByProjectService = async ({ projectId, page }) => {
  const limit = 5;
  const skip = (page - 1) * limit;

  const total = await Task.countDocuments({ projectId });

  const tasks = await Task.find({ projectId })
    .skip(skip)
    .limit(limit)
    .populate("assignedTo", "name email")
    .populate("projectId", "title");

  return {
    totalTasks: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    tasks
  };
};

const updateTaskStatusService = async ({ taskId, status, userId }) => {
  const allowedStatus = ["todo", "in-progress", "done"];

  if (!allowedStatus.includes(status)) {
    throw new AppError("Invalid status", 400);
  }

  const task = await Task.findById(taskId);

  if (!task) throw new AppError("Task not found", 404);

  if (task.assignedTo.toString() !== userId) {
    throw new AppError("Only assigned user can update status", 403);
  }

  task.status = status;
  await task.save();

  return task;
};

module.exports = {
  createTaskService,
  getTasksByProjectService,
  updateTaskStatusService
};
