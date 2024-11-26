const Task = require('../models/task'); 
const mongoose=require("mongoose");

const Taskpost = async (req, res) => {
    try {
        const { task, status, date, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

    

        const newTask = new Task({ task, status, date, userId });
        await newTask.save();

        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: "Invalid userId format" });
        }
        console.error(error);
        res.status(500).json({ error: "Failed to add task" });
    }
};
  
  const Taskget = async (req, res) => {
    const { filter, date, userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      let query = { userId }; 
      if (date) {
        query.date = date;
      }
      if (filter && filter !== "All") {
        query.status = filter;
      }
  
      const tasks = await Task.find(query);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks" });
    }
  };
  
  

  const Taskput= async (req, res) => {
    try {
      const { status } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!updatedTask) return res.status(404).json({ error: "Task not found" });
  
      res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  };
  

const Taskdelete = async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask) return res.status(404).json({ error: "Task not found" });
  
      res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  };

  module.exports={
    Taskdelete,
    Taskget,
    Taskpost,
    Taskput
  }