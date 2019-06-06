
const Sequelize = require('sequelize');

module.exports = new function () {
    const config = {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }, 
    };

    if (process.env.MYSQL_PORT) {
        config['port'] = process.env.MYSQL_PORT;
    }
    this.sequelize = new Sequelize(
        process.env.MYSQL_DB,
        process.env.MYSQL_USER,
        process.env.MYSQL_PASSWORD,
        config
    );
};
