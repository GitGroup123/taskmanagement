const Task = require('../models/task.js');

exports.createTask = async (taskData, userId) => {
  const newTask = new Task({
    title: taskData.title,
    description: taskData.description,
    status: taskData.status,
    userId: userId
  });

  const savedTask = await newTask.save();
  return savedTask;
};

exports.fetchTasks = async (userId, page, limit) => {
  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find({ userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }), // Optional: latest first
    Task.countDocuments({ userId })
  ]);

  return {
    tasks,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit)
  };
};

exports.getTaskById = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  if (task.userId.toString() !== userId) {
    const error = new Error('You are not authorized to access this task');
    error.statusCode = 403;
    throw error;
  }

  return task;
};

exports.updateTaskById = async (taskId, userId, updateData) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  if (task.userId.toString() !== userId) {
    const error = new Error('Unauthorized to update this task');
    error.statusCode = 403;
    throw error;
  }

  Object.assign(task, updateData);
  await task.save();

  return task;
};


exports.deleteTaskById = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  if (task.userId.toString() !== userId) {
    const error = new Error('Unauthorized to delete this task');
    error.statusCode = 403;
    throw error;
  }

  await task.deleteOne();
  return { message: 'Task deleted successfully' };
};


