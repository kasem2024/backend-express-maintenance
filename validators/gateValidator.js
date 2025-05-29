const { body } = require('express-validator');

exports.gateValidationRules = [
  body('name').notEmpty().withMessage('Gate name is required')
];
