import { sign, verify } from 'jsonwebtoken';
require('dotenv').config();
const SECRET_KEY = 'YummyF00d';

function createToken(user) {

    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = sign(process.env.SECRET_KEY || SECRET_KEY);
    return token;
}

function validateToken(token) {
    const payload = verify(process.env.SECRET_KEY || SECRET_KEY);
    return payload;
}

export default {
    createToken,
    validateToken
}