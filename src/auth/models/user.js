const db = require('../../core/db/db');
const Sequelize = require('sequelize');

const User = db.sequelize.define('user', {
    uuid: Sequelize.STRING,
    name: Sequelize.STRING,
    organization_id: Sequelize.INTEGER,
    organization_uuid: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING
});

User.sync();

module.exports = User;
