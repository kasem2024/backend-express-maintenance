const express = require('express');
const router = express.Router();
const controller = require('../controllers/gate.controller');
const { gateValidationRules } = require('../validators/gateValidator');
const validate = require('../middlewares/validate');
const { authenticate, isAdmin } = require('../middlewares/auth');
router.get('/', authenticate, isAdmin, controller.getGates);
router.post('/', authenticate, isAdmin, gateValidationRules , validate  , controller.createGate);
router.put('/:id',authenticate, isAdmin, gateValidationRules , validate  , controller.updateGate);
router.delete('/:id',authenticate, isAdmin, controller.deleteGate);


module.exports = router;
