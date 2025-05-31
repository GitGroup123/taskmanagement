const express = require('express');
const taskController = require("../controllers/task.js");
const {rateLimiter} = require("../middleware/rateLimiter.js");
const { tokenCheck } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post("/tasks", tokenCheck, rateLimiter, taskController.addTask);
router.get("/tasks", tokenCheck, rateLimiter, taskController.getTasks);
router.get('/tasks/:id', tokenCheck, rateLimiter, taskController.getTaskById);
router.put('/tasks/:id', tokenCheck, rateLimiter, taskController.updateTaskById);
router.delete('/tasks/:id', tokenCheck, rateLimiter, taskController.deleteTaskById);




module.exports = router;