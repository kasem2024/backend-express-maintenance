const { body } = require('express-validator');

exports.administrationValidationRules = [
  body('name').notEmpty().withMessage('Administration name is required')
];
