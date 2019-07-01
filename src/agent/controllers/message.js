const express = require('express');
const passport = require('passport');

const Message = require('../models/message');
const Agent = require('../models/agent');

const router = express.Router();

router.get('/',  passport.authenticate('jwt', {session: false}), async (req, res) => {
    const agentIds = await Agent.findAll({
        raw: true,
        where: {organization_id: req.user.get('organization_id')},
        attributes: ['id']
    });
    const messages = await Message.findAll({where: {id: agentIds.map((item) => {return item.id})}});
    res.formatter.ok(messages);
});

module.exports = router
