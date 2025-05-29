const express = require('express');
const router = express.Router();
const controller = require('../controllers/administration.controller');
const { administrationValidationRules } = require('../validators/administrationValidator');
const validate = require('../middlewares/validate');
const { isAdmin, authenticate } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, controller.getAdministrations);
router.post('/', authenticate, isAdmin, administrationValidationRules, validate, controller.createAdministration);
router.put('/:id', authenticate, isAdmin, administrationValidationRules, validate, controller.updateAdministration);
router.delete('/:id', authenticate, isAdmin, controller.deleteAdministration);

module.exports = router;
