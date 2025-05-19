const db = require('../../config/db');

exports.getUserById = (id, res) => {
    if (!id)
      return res.status(400).json({ msg: 'missing id' });
    db.query('SELECT id, email, name, firstname, created_at FROM user WHERE id = ?', [id], (err, results) => {
    if (err)
      return res.status(500).json({ msg: 'DB error' });
    if (results.length === 0)
      return res.status(404).json({ msg: 'User not found' });
    const user = results[0];
    user.created_at = new Date(user.created_at).toISOString().replace('T', ' ').replace('Z', '');
    res.json(user);
  });
};

exports.getUserTodos = (id, res) => {
    if (!id)
      return res.status(400).json({ msg: 'missing id' });
    db.query('SELECT * FROM todo WHERE user_id = ?', [id], (err, results) => {
    if (err)
      return res.status(500).json({ msg: 'DB error' });
    if (results.length === 0)
      return res.status(404).json({ msg: 'No todos found for this user' });
      const todo = results;
    for (let i = 0; i < todo.length; i++) {
      todo[i].created_at = new Date(todo[i].created_at).toISOString().replace('T', ' ').replace('Z', '');
      todo[i].due_time = new Date(todo[i].due_time).toISOString().replace('T', ' ').replace('Z', '');
    }
    return res.status(200).json(todo);
  });
};

exports.getUserByEmail = (email, res) => {
    if (!email)
      return res.status(400).json({ msg: 'missing email' });
    db.query('SELECT id, email, name, firstname, created_at FROM user WHERE email = ?', [email], (err, results) => {
    if (err)
      return res.status(500).json({ msg: 'DB error' });
    if (results.length === 0)
      return res.status(404).json({ msg: 'User not found' });
    res.json(results[0]);
  });
};
