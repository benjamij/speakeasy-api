const express = require('express');
const User = require('../models/user');
const helper = new require('../helpers/auth');
const crypto = new require('../../core/helpers/crypt');
const validators = require('../validators/auth');
const router = express.Router();

router.post('/login', validators.loginValidators, async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({where: {email}});
    if (!user) {
        res.status(401).json({error: 'Incorrect email or password.'});
    }

    if (user.password === crypto.hash(user.salt, password)) {
        res.json({token: helper.generateToken(user)});
    } else {
        res.status(401).json({error: 'Incorrect email or password.'});
    }
});

module.exports = router
