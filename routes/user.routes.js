const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { authenticate, isAdmin } = require('../middlewares/auth');



router.get('/', authenticate , isAdmin, controller.getUsers);
router.delete('/:id',authenticate , isAdmin, controller.deleteUser);

module.exports = router;
