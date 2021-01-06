const ProjectModel = require('../../models/project.model');
const ProjectService = {
	getUserProjects(userId) {
		return ProjectModel.find({ contributors: userId }, null, { sort: { name: 1 } });
	},
};

module.exports = ProjectService;
