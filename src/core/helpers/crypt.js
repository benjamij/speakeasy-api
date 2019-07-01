const crypto = require('crypto');

module.exports = new function () {
    this.generateHash = function (data){
        const salt = crypto.randomBytes(128).toString('base64');
        const hmac = crypto.createHmac('sha512', salt);
        hmac.update(data);
        const digest = hmac.digest('hex');
        return {
          'salt'  : salt,
          'digest': digest
        };
    };

    this.hash = function (salt, data) {
        const hmac = crypto.createHmac('sha512', salt);
        hmac.update(data);
        return hmac.digest('hex');
    }
};
