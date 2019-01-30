const express = require('express');
const cors = require('cors');
const intent = require('./agent/controllers/intent');

const app = express();
const port = process.env.PORT || 3000;

var router = express.Router();

app.use(express.json());
app.use(cors());

router.use('/intent', intent);

app.use('/api/v1', router);

app.listen(port, () => console.log(`SpeakEasy API is listening on port ${port}!`))
