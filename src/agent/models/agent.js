const db = require('../../core/db/db')
const Sequelize = require('sequelize');

const Agent = db.sequelize.define('agent', {
    uuid: Sequelize.STRING,
    name: Sequelize.STRING,
    organization_id: Sequelize.INTEGER,
    auto_responses: Sequelize.BOOLEAN,
    persist_messages: Sequelize.BOOLEAN
});

Agent.sync();

module.exports = Agent;
