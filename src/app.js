const express = require('express');
const intent = require('./agent/controllers/intent');
const app = express();
const port = 3000;

var router = express.Router();
router.use('/intent', intent);

app.use('/api/v1', router);
app.use(express.json());

app.listen(port, () => console.log(`Speakeasy API is listening on port ${port}!`))
