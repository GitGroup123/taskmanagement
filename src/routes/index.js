const express = require('express');
const userRoutes = require('../routes/user.js');
const taskRoutes = require('../routes/task.js');

const router = express.Router();

router.use('/auth', userRoutes);
router.use(taskRoutes);

module.exports = router;