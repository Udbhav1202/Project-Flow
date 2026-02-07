const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: [true, "Please add a user reference"]
  },
}, { timestamps: true });


const ProjectModel = mongoose.model("ProjectModel", projectSchema);

module.exports = ProjectModel;