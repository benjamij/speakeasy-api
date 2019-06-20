const axios = require('axios');
const KJUR = require('jsrsasign');
const ServiceAccount = require('../../auth/models/serviceAccount');
const Agent = require('..//models/agent');

module.exports = new function () {
    _token: null,
    this.connect = (session, agentName, agentId) => {
        axios.defaults.baseURL = 'https://dialogflow.googleapis.com/';
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        if (!session) {
            // Generate random session ID to start a new session.
            const sessionId = Math.floor(Math.random() * 10000) + Math.floor(Date.now() / 1000);
            session = `projects/${agentName}/agent/sessions/${sessionId}`;
        }

        const promise = this._generateToken(agentId, agentName);
        return promise.then((token) => {
            return {token: token, session: session};
        });
    };

    this.detectIntent = async (creds, text, languageCode = 'en-US') => {
        if (!creds.token || !creds.session) {
            throw Exception('No token or session ID generated. You must connect to Dialogflow first.');
        }
        
        const response = await axios
            .post(`/v2/${creds.session}:detectIntent`, {
                queryInput: {
                    text: {
                        text,
                        languageCode
                    }
                }
            }, {headers: { 'Authorization': `Bearer ${creds.token}`}})
            .catch(error => console.log(error));
        return response.data;
    };

    this._generateToken = (agentId, agentName) => {
        const condition = {agent_id: agentId, project_id: agentName};
        return ServiceAccount.findOne({where: condition}).then((creds) => {
            const header = {
                alg: 'RS256',
                typ: 'JWT',
                kid: creds.get('private_key_id')
            };
    
            const payload = {
                iss: creds.get('client_email'),
                sub: creds.get('client_email'),
                iat: KJUR.jws.IntDate.get('now'),
                exp: KJUR.jws.IntDate.get('now + 1hour'),
                aud: 'https://dialogflow.googleapis.com/google.cloud.dialogflow.v2.Sessions'
            };
            return KJUR.jws.JWS.sign(
                'RS256', JSON.stringify(header), JSON.stringify(payload), creds.get('private_key').trim()
            );
        }).catch((error) => {
            console.log(error);
        });
    }
};
