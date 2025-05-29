const express = require('express');
const router = express.Router();
const controller = require('../controllers/workstation.controller');
const { workstationValidationRules } = require('../validators/workstationValidator');
const validate = require('../middlewares/validate');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate , isAdmin,      controller.getWorkstations)
router.post('/',  authenticate , isAdmin,    workstationValidationRules,   validate,  controller.createWorkstation)
router.put('/:id',  authenticate , isAdmin,  workstationValidationRules,   validate,  controller.updateWorkstation)
router.delete('/:id',authenticate , isAdmin, controller.updateWorkstation)

module.exports = router;
