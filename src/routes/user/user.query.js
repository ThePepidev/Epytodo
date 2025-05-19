const db = require('../../config/db');

exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT id, email, name, firstname, created_at FROM user WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
};
