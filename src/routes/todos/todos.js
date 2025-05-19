const express = require('express');
const router = express.Router();
const queries = require('./todos.query');
const authenticateToken = require('../../middleware/auth');

router.use(authenticateToken);

router.get('/', queries.getAllTodos);
router.get('/:id', queries.getTodoById);
router.post('/', queries.createTodo);
router.put('/:id', queries.updateTodo);
router.delete('/:id', queries.deleteTodo);

module.exports = router;