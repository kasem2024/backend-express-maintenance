const { body } = require('express-validator');

exports.workstationValidationRules = [
  body('name').notEmpty().withMessage('workstation name is required')
];
