const { body } = require('express-validator');

exports.registerValidationRules = [
  body('name').notEmpty().withMessage('User name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role').optional().isIn(['admin', 'user']).withMessage('Role must be admin or user')
];
