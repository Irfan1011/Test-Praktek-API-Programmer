const errors = require('./errors');

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        errors.unauthorized();
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken) {
        errors.unauthorized();
    }

    req.email = decodedToken.email;
    next()
}