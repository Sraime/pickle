const express = require('express');
const authController = require('./controllers/auth/auth.controller');
const scenarioController = require('./controllers/scenario/scenario.controller');

const router = express.Router();

router.post('/auth/signin', authController.singin);
router.post('/auth/signup', authController.signup);
router.get('/scenario', scenarioController.getAllNoFeatureScenarios);

module.exports = router;
