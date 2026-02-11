const Task = require("../models/taskModel");
const Project = require("../models/Project");
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

module.exports = {
  createTaskService,
};
