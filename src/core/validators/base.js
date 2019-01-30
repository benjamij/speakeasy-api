
const { validationResult } = require('express-validator/check');

module.exports = new function () {
    this.formatErrors = function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    };
};


