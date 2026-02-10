const Project = require('../models/projectModel');
const AppError = require("../utils/AppError");

const createProject = async (req, res, next) => {
    try{
        const { title, description } = req.body;

        const project = await Project.create({
            title,
            description,
            createdBy: req.user.id
        });

        res.status(201).json(project);
    }catch(error){
        next(error);
    }
};

const getMyProjects = async (req, res, next) => {
  try {

    const projects = await Project.find({
      createdBy: req.user.id
    });

    res.json(projects);

  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, getMyProjects };