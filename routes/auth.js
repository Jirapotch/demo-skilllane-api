var express = require('express');
var router = express.Router();
const Users = require('../models/Users.js');
const jwt = require("jsonwebtoken");
const jwtSecret = "secret";
const jwtExpire = "1d";

router.post('/login', async function (req, res, next) {
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error("invalid username or password.");
        }

        let user_data = await Users.findOne({ username: req.body.username })

        if (user_data === undefined || user_data === null) {
            throw new Error("Invalid username or password.");
        }

        if (req.body.password === user_data.password) {
            let token = jwt.sign(
                {
                    uid: user_data._id,
                    un: user_data.username,
                    fname: user_data.firstName,
                    lname: user_data.lastName,
                    role: user_data.role,
                    img: user_data.image
                },
                jwtSecret,
                { expiresIn: jwtExpire }
            );
            return res.status(200).json({
                token: token
            });
        } else {
            throw new Error("invalid username or password.");
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
