const db = require('../../core/db/db')
const Sequelize = require('sequelize');

const Organisation = db.sequelize.define('organisation', {
    uuid: Sequelize.STRING,
    name: Sequelize.STRING,
    api_key: Sequelize.STRING,
});


Organisation.sync();

module.exports = Organisation;
