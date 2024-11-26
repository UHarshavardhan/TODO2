const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Completed", "Completed", "Postponed", "Cancelled"],
    default: "Not Completed",
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User", 
  },
});

module.exports = mongoose.model("Task", taskSchema);

