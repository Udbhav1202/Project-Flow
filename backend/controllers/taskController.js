const Task = require('../models/taskModel');

const createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

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
    const tasks = await Task.find({
      projectId: req.params.projectId
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasksByProject };