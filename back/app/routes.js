const express = require('express');
const authService = require('./services/auth/auth.service');

const authController = require('./controllers/auth/auth.controller');
const featureController = require('./controllers/feature/feature.controller');
const userFeatureController = require('./controllers/user-feature/user-feature.controller');

const router = express.Router();

router.post('/auth/signin', authController.singin);
router.post('/auth/signup', authController.signup);
router.get('/feature/:featureId', featureController.getFeature);
router.get('/feature/:featureId/scenario', featureController.getAllScenariosByFeature);
router.get('/user/:pseudo/feature', authService.isAuthenticated, userFeatureController.getUserFeatures);

module.exports = router;
