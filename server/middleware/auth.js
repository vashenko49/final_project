const jwt = require("jsonwebtoken");
const config = require("../config/index");

module.exports = function (req, res, next) {

    /*GET token from header*/
    const token = req.header('Authorization');

    /*Check if not token*/
    if (!token) {
        return res.status(401).json({msg: "Not token, authorization denied"});
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(400).json({msg: "Token is not valid"});
    }
};