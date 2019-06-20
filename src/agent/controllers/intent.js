const express = require('express');
const dialogflow = new require('../helpers/dialogflow');
const uuidv4 = require('uuid/v4');
const Agent = require('../models/agent');
const Message = require('../models/message');
const ServiceAccount = require('../../auth/models/serviceAccount');
const validators = require('../validators/intent');
const router = express.Router();

router.post('/detect', validators.detectValidators, (req, res) => {
    Agent.findOne({where: {uuid: req.body.agent}}).then(async (agent) => {
        const serviceAccount = await ServiceAccount.findOne({where: {agent_id: agent.get('id')}});
        persist_if_required(agent, 'agent', 'client', {'message': req.body.text}, req);
        const promise = dialogflow.connect(req.body.session, serviceAccount.get('project_id'), agent.get('id'));
        promise.then((creds) => {
            let response = dialogflow.detectIntent(creds, req.body.text, req.body.language);
            response.then((data) => {
                data.session = creds.session;
                persist_if_required(agent, 'client', 'agent', data, req);
                res.send(data);
            });
            response.catch((error) => res.send({'errors': ['Request could not be processed.']}));
        });
    });

    function persist_if_required (agent, to, from, message, req) {
        if (agent.get('persist_messages')) {
            Message.create({
                uuid: uuidv4(),
                from: from,
                to: to,
                session_id: req.body.session,
                agent_uuid: req.body.agent,
                content: JSON.stringify(message)
            });
        }
    }
});

module.exports = router
