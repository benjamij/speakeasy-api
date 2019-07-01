const { check } = require('express-validator/check');
const baseValidator = new require('../../core/validators/base');

module.exports = {
    loginValidators: [
        check('email').isEmail().trim().escape(),
        check('password').isString().trim().escape(),
        baseValidator.formatErrors
    ]
};
