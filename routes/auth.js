const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserSchema = require('./../models/User');
const auth = require('../middleware/auth');
/*
@route GET api/auth
@desc  Get logged in user
@access Private
 */
router.get('/', auth, async (req, res) => {
    try {
        const user = await UserSchema.findById(req.user.id).select("-password");
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server error')
    }
});

/*
@route POST api/auth
@desc  Auth user & get token
@access Public
 */
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password id required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {email, password} = req.body;

    try {
        let user = await UserSchema.findOne({email});

        if (!user) {
            return res.status(400).json({msg: "Invalid Credential"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Invalid Credential"});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({token});
        });


    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error')
    }

});

module.exports = router;