import { validateToken } from '../services/authentication';

function checkForAuthenticationCookie(cookieName) {
    return (req,res,next) => {
        const cookieValue = req.cookies[cookieName];
        if(!cookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(cookieValue);
            console.log(req.user);
            console.log(userPayload);
            req.user = userPayload;
        } catch (err) {
            console.error("Error decoding token:", err);
        }
        return next();
    }
}

export default {
    checkForAuthenticationCookie
}