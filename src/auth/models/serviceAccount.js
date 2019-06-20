const db = require('../../core/db/db')
const Sequelize = require('sequelize');

const ServiceAccount = db.sequelize.define('serviceAccount', {
    uuid: Sequelize.STRING,
    agent_id: Sequelize.INTEGER,
    project_id: Sequelize.STRING,
    private_key_id: Sequelize.STRING,
    private_key: Sequelize.TEXT,
    client_email: Sequelize.STRING,
    client_id: Sequelize.STRING,
    auth_uri: Sequelize.STRING,
    token_uri: Sequelize.STRING,
    auth_provider_x509_cert_url: Sequelize.STRING,
    client_x509_cert_url: Sequelize.STRING,
    type: Sequelize.STRING,
});


ServiceAccount.sync();

module.exports = ServiceAccount;
