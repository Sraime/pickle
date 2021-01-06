const ProjectService = require('../../services/project/project.service');
const FeatureService = require('../../services/feature/feature.service');
const ProjectEvents = require('../../sockets/project/project-events');

const ProjectController = {
	getFeatures: async (req, res) => {
		const projectFeatures = await FeatureService.getProjectFeatures(req.params.projectId);
		res.json(projectFeatures);
	},

	postFeature: (req, res) => {
		const userId = req.user.id;
		const projectId = req.params.projectId;
		return FeatureService.createFeature(req.body.name, userId, projectId)
			.then((createdFeature) => {
				ProjectEvents.emitFeaturesUpdate(projectId);
				res.json(createdFeature);
			})
			.catch((error) => {
				res.status(400).send();
			});
	},

	getProjects: async () => {
		const userId = req.user.id;
		const userProjects = await ProjectService.getUserProjects(userId);
		res.json(userProjects);
	},
};

module.exports = ProjectController;
