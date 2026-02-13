const asyncHandler = require('../utils/asyncHandler');
const {
  getMyProjectService,
  createProjectService
} = require("../services/projectService");

const createProject = asyncHandler(async (req, res) => {
  const project = await createProjectService({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id
  });

  res.status(201).json(project);
});

const getMyProjects = asyncHandler(async (req, res) => {
  const projects = await getMyProjectService({
    userId: req.user.id
  });

  res.json(projects);
});

module.exports = { createProject, getMyProjects };
