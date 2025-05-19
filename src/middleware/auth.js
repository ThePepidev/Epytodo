const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      return res.status(401).json({ msg: 'missing token' });

    const token = authHeader.split(' ')[1];
    if (!token)
      return res.status(401).json({ msg: 'invalid token format' });

    jwt.verify(token, SECRET_KEY, (err, user) =>  {
    if (err)
      return res.status(403).json({ msg: 'invalid token' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;