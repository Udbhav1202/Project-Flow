const Project = require('../models/projectModel');

const createProject = async (req, res) => {
    try{
        const { title, description } = req.body;

        const project = await Project.create({
            title,
            description,
            createdBy: req.user.id
        });

        res.status(201).json(project);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const getMyProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      createdBy: req.user.id
    });

    res.json(projects);

  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getMyProjects };