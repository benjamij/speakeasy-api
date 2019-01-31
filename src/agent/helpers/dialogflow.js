const axios = require('axios');
const KJUR = require('jsrsasign');

module.exports = new function () {
    _token: null,
    this.connect = (session, agentName) => {
        axios.defaults.baseURL = 'https://dialogflow.googleapis.com/';
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        if (!session) {
            // Generate random session ID to start a new session.
            const sessionId = Math.floor(Math.random() * 10000) + Math.floor(Date.now() / 1000);
            session = `projects/${agentName}/agent/sessions/${sessionId}`;
        } 
        return {token: this._generateToken(), session: session};
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

    this._generateToken = () => {
        const keyFile = process.env.JSON_KEY || '../../../key.json';
        const creds = require(keyFile);
        const header = {
            alg: 'RS256',
            typ: 'JWT',
            kid: creds.private_key_id
        }
  
        const payload = {
            iss: creds.client_email,
            sub: creds.client_email,
            iat: KJUR.jws.IntDate.get('now'),
            exp: KJUR.jws.IntDate.get('now + 1hour'),
            aud: 'https://dialogflow.googleapis.com/google.cloud.dialogflow.v2.Sessions'
        }

        return KJUR.jws.JWS.sign(
            'RS256', JSON.stringify(header), JSON.stringify(payload), creds.private_key
        )
    }
};
