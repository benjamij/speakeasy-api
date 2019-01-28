const express = require('express');
const dialogflow = new require('../helpers/dialogflow');
const router = express.Router();

router.post('/detect', function (req, res) {
    dialogflow.connect();
    let response = dialogflow.detectIntent(req.query.agent, req.query.text, req.query.language);
    response.then((data) => {
        res.send(data);
    });
});

module.exports = router
