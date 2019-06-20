const db = require('../../core/db/db')
const Sequelize = require('sequelize');

const User = db.sequelize.define('user', {
    uuid: Sequelize.UUIDV4,
    name: Sequelize.STRING,
    organization_id: Sequelize.INTEGER,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

User.sync();

module.exports = Agent;
