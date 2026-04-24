const Task = require("../models/taskModel");

const asyncHandler = require("../utils/asyncHandler");
const {
  createTaskService,
  getTasksByProjectService,
  updateTaskStatusService
} = require("../services/taskService");


const createTask = asyncHandler(async (req, res) => {
  const task = await createTaskService({
    title: req.body.title,
    projectId: req.body.projectId,
    assignedTo: req.body.assignedTo,
    userId: req.user.id,
    description: req.body.description
  });

  res.status(201).json(task);
});

const getTasksByProject = asyncHandler(async (req, res) => {
  const data = await getTasksByProjectService({
    projectId: req.params.projectId,
    page: Math.max(parseInt(req.query.page) || 1, 1)
  });

  res.json(data);
});

const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    assignedTo: req.user.id,
  })
    .populate("projectId", "title")
    .populate("assignedTo", "name");

  res.json(tasks);
});


const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await updateTaskStatusService({
    taskId: req.params.id,
    status: req.body.status,
    userId: req.user.id
  });

  res.json(task);
});




module.exports = { createTask, getTasksByProject, updateTaskStatus, getMyTasks };
