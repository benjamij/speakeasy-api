const express = require('express');
const dialogflow = new require('../helpers/dialogflow');
const Message = require('../models/message');
const Agent = require('../models/message');
const router = express.Router();

router.get('/:session_id',(req, res) => {
    Message.findAll({where: {session_id: req.query.session_id}}).then((messages) => {
        res.send(messages);
    });
});

module.exports = router
