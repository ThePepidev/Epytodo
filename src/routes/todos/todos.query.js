const db = require('../../config/db');

exports.getAllTodos = (req, res) => {
    const userId = req.user.id;
    db.query('SELECT * FROM todo WHERE user_id = ?', [userId], (err, results) => {
    if (err)
        return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (results.length === 0) return res.status(404).json({ error: 'Todo not found' });
    res.json(results[0]);
  });
};

exports.createTodo = (req, res) => {
    const { title, description, due_time, status } = req.body;
    const userId = req.user.id;
    db.query(
    'INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)',
    [title, description, due_time, status || 'not started', userId],
    (err, result) => {
        if (err)
            return res.status(500).json({ error: 'DB error' });
        res.status(201).json({ id: result.insertId, title, description, due_time, status, user_id: userId });
    }
  );
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, due_time, status } = req.body;
    db.query(
    'UPDATE todo SET title = ?, description = ?, due_time = ?, status = ? WHERE id = ?',
    [title, description, due_time, status, id],
    (err) => {
        if (err) 
            return res.status(500).json({ error: 'DB error' });
        res.json({ message: 'Todo updated' });
    }
  );
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todo WHERE id = ?', [id], (err) => {
    if (err)
        return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Todo deleted' });
  });
};
