import { sign, verify } from 'jsonwebtoken';
const SECRET_KEY = 'YummyF00d';

function createToken(user) {

    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = sign(SECRET_KEY);
    return token;
}

function validateToken(token) {
    const payload = verify(SECRET_KEY);
    return payload;
}

export default {
    createToken,
    validateToken
}