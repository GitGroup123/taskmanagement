const taskService = require('../services/taskService.js');
const { addTaskSchema } = require('../validation/taskValidation.js');

exports.addTask = async (req, res) => {
  try {
    const { error, value } = addTaskSchema.validate(req.body);
       if (error) {
         return res.status(400).json({ message: error.details[0].message });
       }

    const userId = req.user.id;
    const task = await taskService.createTask(value, userId);

    return res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (err) {
    console.error('Error creating task:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTasks = async(req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await taskService.fetchTasks(userId, page, limit);
    return res.status(200).json(result);

  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await taskService.getTaskById(taskId, userId);
    return res.status(200).json(task);

  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};

exports.updateTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const updateData = req.body;

    const updatedTask = await taskService.updateTaskById(taskId, userId, updateData);
    res.status(200).json(updatedTask);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const result = await taskService.deleteTaskById(taskId, userId);
    res.status(200).json(result);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

