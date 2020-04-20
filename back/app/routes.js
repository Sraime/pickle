const express = require('express');
const authController = require('./controllers/auth/auth.controller');
const featureController = require('./controllers/feature/feature.controller');

const router = express.Router();

router.post('/auth/signin', authController.singin);
router.post('/auth/signup', authController.signup);
router.get('/feature/:featureId', featureController.getFeature);
router.get('/feature/:featureId/scenario', featureController.getAllScenariosByFeature);

module.exports = router;
