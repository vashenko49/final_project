const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = function (req, res, next) {

    /*GET token from header*/
    const token = req.header('x-auth-token');

    /*Check if not token*/
    if (!token) {
        return res.status(401).json({msg: "Not token, authorization denied"});
    }


    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(400).json({msg: "Token is not valid"});
    }
};