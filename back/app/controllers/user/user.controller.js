const ProjectService = require('../../services/project/project.service');

const UserFeatureController = {
	getProjects: async (req, res) => {
		if (req.params.userId !== req.user.id) {
			res.status(403).send();
			return;
		}
		const userProject = await ProjectService.getUserProjects(req.user.id);
		res.json(userProject);
	},
};

module.exports = UserFeatureController;
