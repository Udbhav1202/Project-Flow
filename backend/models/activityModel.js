const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  action: {
    type: String,
    required: [true, "Please add a description"],
    enum: ["task-created", "status-updated"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add a user reference"],
  },
  
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: [true, "Please add a task reference"],
  },

}, { timestamps: true });


const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;