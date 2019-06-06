const express = require('express');
const dialogflow = new require('../helpers/dialogflow');
const validators = require('../validators/intent');
const router = express.Router();

router.post('/detect', validators.detectValidators, (req, res) => {
    const promise = dialogflow.connect(req.body.session, req.body.agent, req.body.apiKey);
    promise.then((creds) => {
        let response = dialogflow.detectIntent(creds, req.body.text, req.body.language);
        response.then((data) => {
            data.session = creds.session;
            res.send(data);
        });
        response.catch((error) => res.send({'errors': ['Request could not be processed.']}));
    });
});

module.exports = router
