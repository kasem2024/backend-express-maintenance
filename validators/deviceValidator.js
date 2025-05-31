const { body } = require('express-validator');

exports.deviceValidationRules = [
  body('name').notEmpty().withMessage('Device name is required'),
  body('ownerName').notEmpty().withMessage('Owner name is required'),
  body('specs').notEmpty().withMessage('Specs object is required'),
  body('specs.cpu').notEmpty().withMessage('CPU info is required'),
  body('specs.mac').notEmpty().withMessage('MAC address is required'),
  body('specs.ram').notEmpty().withMessage('RAM info is required'),
  body('specs.deviceType').notEmpty().withMessage('Device type is required'),
  body('sectorId').notEmpty().isInt().withMessage('sectorId must be an integer'),
  body('administrationId').notEmpty().isInt().withMessage("administrationId is required"),
  body('workstationId').notEmpty().isInt().withMessage("worstationId is required"),
  body('gateId').notEmpty().isInt().withMessage("gateId is required"),
];
