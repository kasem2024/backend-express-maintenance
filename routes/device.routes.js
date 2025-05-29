const express = require('express');
const router = express.Router();
const controller = require('../controllers/device.controller');
const { deviceValidationRules } = require('../validators/deviceValidator');
const validate = require('../middlewares/validate');
const { authenticate } = require('../middlewares/auth');



router.get('/', authenticate, controller.getDevices);
router.post('/',authenticate, deviceValidationRules, validate, controller.createDevice);
router.put('/:id',authenticate, deviceValidationRules, validate , controller.updateDevice);
router.delete('/:id',authenticate, controller.deleteDevice);
router.get('/fetch-device-info/:ip',authenticate, controller.getDeviceInfo)


module.exports = router;
