const db = require('../../core/db/db');
const Sequelize = require('sequelize');

const Message = db.define('message', {
    uuid: Sequelize.STRING,
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    is_read_by_admin: Sequelize.BOOLEAN,
    session_id: Sequelize.STRING,
    agent_uuid: Sequelize.STRING,
    content: Sequelize.TEXT
});

Message.sync();

module.exports = Message;
