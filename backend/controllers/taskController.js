
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


const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await updateTaskStatusService({
    taskId: req.params.id,
    status: req.body.status,
    userId: req.user.id
  });

  res.json(task);
});




module.exports = { createTask, getTasksByProject, updateTaskStatus };
