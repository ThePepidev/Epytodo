function notFound(req, res, next) {
    res.status(404).json({ msg: 'not found' });
    }

module.exports = notFound;
