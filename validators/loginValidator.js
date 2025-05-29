const { body } = require('express-validator');

exports.loginValidationRules = [
  body('name').notEmpty().withMessage('User name is required'),
  body('password').notEmpty().withMessage('Password is required'),
];
