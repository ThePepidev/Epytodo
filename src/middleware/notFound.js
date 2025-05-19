function notFound(req, res, next) {
    res.status(404).json({ error: 'not found' });
    }

module.exports = notFound;
