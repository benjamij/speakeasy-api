const express = require('express');
const passport = require('passport');
const uuidv4 = require('uuid/v4');

const Message = require('../models/message');
const Agent = require('../models/agent');

const validators = require('../validators/message');

const router = express.Router();

router.get('/',  passport.authenticate('jwt', {session: false}), async (req, res) => {
    const agentIds = await Agent.findAll({
        raw: true,
        where: {organization_id: req.user.get('organization_id')},
        attributes: ['uuid']
    });
    const config = {
        where: {agent_uuid: agentIds.map((item) => {return item.uuid})}
    };

    // TODO: refactor this, since it will be the same across all controllers
    if (req.query.groupBy) {
        config['group'] =[req.query.groupBy];
    }
    const messages = await Message.findAll(config);
    res.formatter.ok(messages);
});

router.post('/', validators.post, passport.authenticate('jwt', {session: false}), async (req, res) => {
    // TODO: refactor this, since it will be the same across all controllers
    let data = req.body;
    data.uuid = uuidv4();
    data.content = JSON.stringify(req.body.content);
    res.formatter.ok(await Message.create(data, {user: req.user}));
});

module.exports = router
