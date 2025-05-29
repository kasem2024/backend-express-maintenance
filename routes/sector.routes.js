const express = require('express');
const router = express.Router();
const controller = require('../controllers/sector.controller');
const { sectorValidationRules } = require('../validators/sectorValidator');
const validate = require('../middlewares/validate');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/',authenticate , isAdmin, controller.getSectors);
router.post('/',authenticate , isAdmin, sectorValidationRules,validate, controller.createSector);
router.put('/:id',authenticate , isAdmin, sectorValidationRules,validate, controller.updateSector);
router.delete('/:id',authenticate , isAdmin, controller.deleteSector);


module.exports = router;
