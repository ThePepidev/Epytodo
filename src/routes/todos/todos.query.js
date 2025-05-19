const db = require('../../config/db');

exports.getAllTodos = (req, res) => {
    const userId = req.user.id;
    db.query('SELECT * FROM todo WHERE user_id = ?', [userId], (err, results) => {
    if (err)
        return res.status(500).json({ error: 'DB error' });
    return res.status(200).json(results);
  });
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
    if (err)
      return res.status(500).json({ error: 'DB error' });
    if (results.length === 0)
      return res.status(404).json({ error: 'Todo not found' });
    return res.status(200).json(results[0]);
  });
};

exports.createTodo = (req, res) => {
    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id || !status) {
        return res.status(400).json({ msg: 'Bad parameters' });
    }
    db.query('SELECT * FROM user WHERE id = ?', [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'DB error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        db.query(
            'INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)',
            [title, description, due_time, user_id, status || 'not started'],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'DB error' });
                }
                return res.status(201).json({ id: result.insertId, title, description, due_time, user_id, status });
            }
        );
    });
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, due_time, user_id, status } = req.body;
    if (!title || !description || !due_time || !user_id || !status) {
        return res.status(400).json({ msg: 'Bad parameters' });
    }
    db.query(
    'UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?',
    [title, description, due_time, user_id, status, id],
    (err, results) => {
        if (err) 
          return res.status(500).json({ error: 'DB error' });
        if (results.length === 0)
          return res.status(404).json({ msg: 'Todo not found' });
        return res.status(200).json({ id: id, title, description, due_time, user_id, status });
    }
  );
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ msg: 'Bad parameters' });
    db.query('DELETE FROM todo WHERE id = ?', [id], (err) => {
    if (err)
        return res.status(500).json({ error: 'DB error' });
    return res.status(200).json({ msg: `Successfully deleted record number : ${id}` });
  });
};
