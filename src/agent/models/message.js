const db = require('../../core/db/db')
const Sequelize = require('sequelize');

const Message = db.sequelize.define('message', {
    uuid: Sequelize.STRING,
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    session_id: Sequelize.STRING,
    agent_uuid: Sequelize.STRING,
    content: Sequelize.TEXT
});

Message.sync();

module.exports = Message;
