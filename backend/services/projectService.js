const Project = require("../models/projectModel");
const AppError = require("../utils/AppError");

const createProjectService = async ({ title, description, userId }) => {
  if (!title) {
    throw new AppError("Title is required", 400);
  }

  const project = await Project.create({
    title,
    description,
    createdBy: userId
  });

  return project;
};

const getMyProjectService = async ({ userId }) => {
  const projects = await Project.find({
    createdBy: userId
  }).sort({ createdAt: -1 });

  return projects;
};

module.exports = {
  createProjectService,
  getMyProjectService
};
