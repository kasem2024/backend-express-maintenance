const express = require('express');
const router = express.Router();
const controller = require('../controllers/register.controller');

const validate = require('../middlewares/validate');
const { registerValidationRules } = require('../validators/registerValidator');



router.post('/',registerValidationRules, validate, controller.register);


module.exports = router;
