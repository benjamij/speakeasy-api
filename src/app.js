require('dotenv').config();

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
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

var router = express.Router();

app.use(express.json());
app.use(cors());
app.use(responseEnhancer());

router.use('/intent', intent);
router.use('/messages', messages);
router.use('/auth', auth);

app.use('/api/v1', router);

const server = app.listen(port, () => console.log(`SpeakEasy API is listening on port ${port}!`));

server.broadcast = (channel, msg) => io.emit(channel, msg);

var io = require('socket.io')(http);
http.listen(port + 1, '::1', () => console.log(`SocketIO listening on port ${port + 1}`));

module.exports = server
