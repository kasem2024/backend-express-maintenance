const { body } = require('express-validator');

exports.maintenanceValidationRules = [
  body('technicalReceiver').notEmpty().withMessage('Technical receiver is required'),
  body('problemDescription').notEmpty().withMessage('Problem description is required'),
  body('ownerName').notEmpty().withMessage('Owner name is required'),
  body('ownerContact').optional().isString(),
  body('senderName').optional().isString(),
  body('senderContact').optional().isString(),
  body('arrivalDate').optional().isISO8601().withMessage('Arrival date must be a valid date'),
  body('location').optional().isString(),
  body('notes').optional().isString(),
  body('technicalResolver').optional().isString(),
  body('status').optional().isIn(['pending', 'in_progress', 'completed', 'cancelled']).withMessage('Invalid status'),
  body('isDelivered').optional().isBoolean(),
  body('maintainedBy').optional().isInt(),
  body('approvedBy').optional().isInt(),
  body('deviceId').optional().isInt()
];
