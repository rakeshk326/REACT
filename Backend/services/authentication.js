const JWT = require('jsonwebtoken');
const SECRET_KEY = 'YummyF00d';

function createToken(user) {

    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = JWT.sign(SECRET_KEY);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(SECRET_KEY);
    return payload;
}

module.exports = {
    createToken,
    validateToken
}