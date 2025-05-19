const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET;

router.post('/register', (req, res) => {
    const { email, password, firstname, name } = req.body;

    if (!email || !password || !firstname || !name) {
        return res.status(400).json({ error: 'missing parameters' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(
    'INSERT INTO user (email, password, firstname, name) VALUES (?, ?, ?, ?)',
    [email, hashedPassword, firstname, name],
    (err, result) => {
        if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'email already exists' });
        }
        return res.status(500).json({ error: 'database error' });
        }
        return res.status(201).json({ msg: 'user created' });
    }
  );
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: 'missing parameters' });

  db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err)
        return res.status(500).json({ error: 'database error' });
    if (results.length === 0)
        return res.status(401).json({ error: 'invalid credentials' });

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password))
        return res.status(401).json({ error: 'invalid credentials' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '2h' });

    return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        firstname: user.firstname,
        created_at: user.created_at,
        token: token
    });
  });
});

module.exports = router;
