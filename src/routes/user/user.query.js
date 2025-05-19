const db = require('../../config/db');

exports.getUserById = (id, res) => {
    if (!id)
      return res.status(400).json({ error: 'missing id' });
    db.query('SELECT id, email, name, firstname, created_at FROM user WHERE id = ?', [id], (err, results) => {
    if (err)
      return res.status(500).json({ error: 'DB error' });
    if (results.length === 0)
      return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
};

exports.getUserTodos = (id, res) => {
    if (!id)
      return res.status(400).json({ error: 'missing id' });
    db.query('SELECT * FROM todo WHERE user_id = ?', [id], (err, results) => {
    if (err)
      return res.status(500).json({ error: 'DB error' });
    if (results.length === 0)
      return res.status(404).json({ msg: 'No todos found for this user' });
    res.json(results);
  });
};

exports.getUserByEmail = (email, res) => {
    if (!email)
      return res.status(400).json({ error: 'missing email' });
    db.query('SELECT id, email, name, firstname, created_at FROM user WHERE email = ?', [email], (err, results) => {
    if (err)
      return res.status(500).json({ error: 'DB error' });
    if (results.length === 0)
      return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
};
