require('dotenv').config()

const express = require('express');
const passport = require('passport');
const responseEnhancer = require('express-response-formatter')

const cors = require('cors');

const intent = require('./agent/controllers/intent');
const messages = require('./agent/controllers/message');
const auth = require('./auth/controllers/auth');
const authHelper = require('./auth/helpers/auth');


passport.use(authHelper.strategy);

const app = express();
const port = process.env.PORT || 3000;

var router = express.Router();

app.use(express.json());
app.use(cors());
app.use(responseEnhancer());

router.use('/intent', intent);
router.use('/messages', messages);
router.use('/auth', auth);

app.use('/api/v1', router);

const server = app.listen(port, () => console.log(`SpeakEasy API is listening on port ${port}!`))
module.exports = server;
