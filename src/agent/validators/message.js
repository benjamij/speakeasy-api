const { check } = require('express-validator/check');
const baseValidator = new require('../../core/validators/base');

module.exports = {
    post: [
        check('agent_uuid').isString().trim().escape(),
        check('content').escape(),
        check('from').isString().trim().escape(),
        check('to').isString().trim().escape(),
        check('session_id').isString().trim(),
        baseValidator.formatErrors
    ]
};
