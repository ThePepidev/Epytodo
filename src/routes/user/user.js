const express = require('express');
const router = express.Router();
const userQuery = require('./user.query');
const authenticateToken = require('../../middleware/auth');
const db = require('../../config/db');

router.use(authenticateToken);

router.get('/', (req, res) => {
    const userId = req.user.id;
    userQuery.getUserById(userId, res);
});
router.get("/todos", (req, res) => {
    const userId = req.user.id;
    userQuery.getUserTodos(userId, res);
});
router.get('/:param', (req, res) => {
    if (!isNaN(req.params.param)) {
        const userId = req.params.param;
        userQuery.getUserById(userId, res);
    }
    else {
        const email = req.params.param;
        userQuery.getUserByEmail(email, res);
    }
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { email, password, firstname, name } = req.body;
    if (!name || !firstname || !email || !password)
        return res.status(400).json({ msg: 'Bad parameters' });
    const hashed_password = bcrypt.hashSync(password, 10);
    db.query('UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?', [email, hashed_password, name, userId], (err) => {
        if (err)
            return res.status(500).json({ error: 'DB error' });
        return res.status(200), userQuery.getUserById(userId, res);
    });
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM user WHERE id = ?', [userId], (err) => {
        if (err)
            return res.status(500).json({ error: 'DB error' });
        return res.status(200).json({ msg: `Successfully deleted record number: ${userId}` });
    });
});

module.exports = router;
