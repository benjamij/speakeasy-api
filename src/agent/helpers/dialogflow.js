const axios = require('axios');
const KJUR = require('jsrsasign');

module.exports = new function () {
    _token: null,
    this.connect = () => {
        axios.defaults.baseURL = 'https://dialogflow.googleapis.com/';
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        // Generate random session ID.
        this._sessionId = Math.floor(Math.random() * 10000) + Math.floor(Date.now() / 1000);

        // Generate access token.
        this._token = this._generateToken();
    };

    this.detectIntent = async (agentName, text, languageCode = 'en-US') => {
        if (!this._token) {
            throw Exception('No token generated. You must connect to Dialogflow first.');
        }

        const session = `projects/${agentName}/agent/sessions/${this._sessionId}`;
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${this._token}`;
        const response = await axios
            .post(`/v2/${session}:detectIntent`, {
                queryInput: {
                    text: {
                        text,
                        languageCode
                    }
                }
            })
            .catch(error => console.log(error));
        return response.data;
    };

    this._generateToken = () => {
        const creds = require('../../../key.json');
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
