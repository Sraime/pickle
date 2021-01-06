const express = require('express');
const authService = require('./services/auth/auth.service');

const authController = require('./controllers/auth/auth.controller');
const featureController = require('./controllers/feature/feature.controller');
const userController = require('./controllers/user/user.controller');
const projectController = require('./controllers/project/project.controller');

const router = express.Router();

router.post('/auth/signin', authController.singin);
router.post('/auth/signup', authController.signup);

router.get('/feature/:featureId', featureController.getFeature);
router.get('/feature/:featureId/codeblock', featureController.getAllCodeblocksByFeature);

router.get('/user/:userId/project', authService.isAuthenticated, userController.getProjects);

router.get('/project/:projectId/feature', authService.isAuthenticated, projectController.getFeatures);
router.post('/project/:projectId/feature', authService.isAuthenticated, projectController.postFeature);

module.exports = router;
