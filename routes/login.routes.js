const express = require('express');
const router = express.Router();
const controller = require('../controllers/login.controller');
const validate = require('../middlewares/validate');
const { loginValidationRules } = require('../validators/loginValidator');


router.post('/',loginValidationRules, validate, controller.login);

module.exports = router;
