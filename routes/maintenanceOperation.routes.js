const express = require('express');
const router = express.Router();
const controller = require('../controllers/maintenance.controller');
const { maintenanceValidationRules } = require('../validators/maintenanceOperationValidator');
const validate = require('../middlewares/validate');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/',authenticate,  controller.getMaintenanceOperations);
router.post('/', authenticate, maintenanceValidationRules ,validate, controller.createMaintenanceOperation);
router.put('/:id',authenticate,  maintenanceValidationRules ,validate, controller.updateMaintenanceOperation);
router.delete('/:id',authenticate,  controller.deleteMaintenanceOperation);


module.exports = router;
