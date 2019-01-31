const { check } = require('express-validator/check');
const baseValidator = new require('../../core/validators/base');

module.exports = {
    detectValidators: [
        check('agent').isString().trim().escape(),
        check('text').isString().trim().escape(),
        check('session').optional().trim(),
        baseValidator.formatErrors
    ]
};
