const { body } = require('express-validator');

exports.sectorValidationRules = [
  body('name').notEmpty().withMessage('Sector name is required')
];
