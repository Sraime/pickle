const RoomService = require('../room-service');
const FeatureService = require('../../services/feature/feature.service');
const SocketioServer = require('../socketio-server');

const ProjectEvents = {
	joinProject: (server, projectInfo) => {
		RoomService.joinRoom(server.socket, projectInfo.roomId);
		server.projectId = projectInfo.roomId;
	},

	emitFeaturesUpdate: async (projectId) => {
		const projectFeatures = await FeatureService.getProjectFeatures(projectId);
		RoomService.roomEmit(projectId, 'project-features-update', projectFeatures);
	},
};

module.exports = ProjectEvents;
