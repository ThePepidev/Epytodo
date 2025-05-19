const db = require('../../config/db');

exports.getAllTodos = (req, res) => {
  db.query('SELECT * FROM todo', (err, results) => {
  if (err)
    return res.status(500).json({ msg: 'DB error' });
  if (results.length === 0)
    return res.status(404).json({ msg: 'Todo not found' });
  const todo = results;
  for (let i = 0; i < todo.length; i++) {
    todo[i].created_at = new Date(todo[i].created_at).toISOString().replace('T', ' ').replace('Z', '');
    todo[i].due_time = new Date(todo[i].due_time).toISOString().replace('T', ' ').replace('Z', '');
  }
  return res.status(200).json(todo);
  });
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(id))
      return res.status(400).json({ msg: 'Bad parameters' });

  db.query('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
    if (err)
        return res.status(500).json({ msg: 'DB error' });
    if (results.length === 0)
        return res.status(404).json({ msg: 'Todo not found' });
    const todo = results[0];

    todo.created_at = new Date(todo.created_at).toISOString().replace('T', ' ').replace('Z', '');
    todo.due_time = new Date(todo.due_time).toISOString().replace('T', ' ').replace('Z', '');
    return res.status(200).json(todo);
  });
};

exports.createTodo = (req, res) => {
    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id || !status || status === undefined) {
        return res.status(400).json({ msg: 'Bad parameters' });
    }
    db.query('SELECT * FROM user WHERE id = ?', [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: 'DB error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        db.query(
            'INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)',
            [title, description, due_time, user_id, status || 'not started'],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ msg: 'DB error' });
                }
                const insertId = result.insertId;
                db.query('SELECT * FROM todo WHERE id = ?', [insertId], (err, results) => {
                    if (err) {
                        return res.status(500).json({ msg: 'DB error' });
                    }
                    const todo = results[0];
                    todo.created_at = new Date(todo.created_at).toISOString().replace('T', ' ').replace('Z', '');
                    todo.due_time = new Date(todo.due_time).toISOString().replace('T', ' ').replace('Z', '');
                    return res.status(201).json(todo);
                });
            }
        );
    });
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, due_time, user_id, status } = req.body;
    if (!id || !title || !description || !due_time || !user_id || !status || status === undefined) {
        return res.status(400).json({ msg: 'Bad parameters' });
    }
    db.query(
    'UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?',
    [title, description, due_time, user_id, status, id],
    (err, results) => {
        if (err) 
          return res.status(500).json({ msg: 'DB error' });
        if (results.length === 0)
          return res.status(404).json({ msg: 'Todo not found' });
        db.query('SELECT * FROM todo WHERE id = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).json({ msg: 'DB error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ msg: 'Todo not found' });
            }
            const todo = result[0];
            todo.created_at = new Date(todo.created_at).toISOString().replace('T', ' ').replace('Z', '');
            todo.due_time = new Date(todo.due_time).toISOString().replace('T', ' ').replace('Z', '');
            return res.status(201).json(todo);
        });
    }
  );
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ msg: 'Bad parameters' });
    db.query('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ msg: 'DB error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ msg: 'Todo not found' });
      }
      db.query('DELETE FROM todo WHERE id = ?', [id], (err) => {
      if (err)
        return res.status(500).json({ msg: 'DB error' });
      return res.status(200).json({ msg: `Successfully deleted record number : ${id}` });
      });
    });
};
