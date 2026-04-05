import Task from "../models/Task.js";

// Get Tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

// Create Task
export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(task);
};

// Update Task
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
};

// Delete Task
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};