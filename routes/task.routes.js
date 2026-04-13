const express = require('express');
const router = express.Router();

const controller = require('../controller/task.controller'); // ✅ FIXED

const auth = require('../middleware/auth.middleware');

router.use(auth);

router.post('/', controller.createTask);
router.get('/', controller.getTasks);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;