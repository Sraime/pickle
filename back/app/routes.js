const express = require('express');
const authController = require('./controllers/auth/auth.controller')

const router = express.Router();

router.post('/auth/signin', authController.singin);
router.post('/auth/signup', authController.signup);

module.exports = router;
