const BoardService = require('../../services/board/board.service');
const FeatureService = require('../../services/feature/feature.service');
const RoomService = require('../room-service');

const BoardEvents = {
	joinBoard: (server, targetRoom) => {
		RoomService.joinRoom(server.socket, targetRoom.roomId);
		server.featureId = targetRoom.roomId;
	},

	leaveBoard: (server, targetRoom) => {
		RoomService.leaveRoom(server.socket, targetRoom.roomId);
		server.featureId = null;
	},

	sectionUpdate: (server, sectionData) => {
		BoardService.insertSectionUpdate(sectionData.name, sectionData.steps, sectionData.codeBlockId)
			.then(() => {
				server.io.to(server.session.featureId).emit('board-section-update', sectionData);
			})
			.catch((e) => {});
	},

	scenarioUpdate: (server, scenarioData) => {
		let serviceResult;
		switch (scenarioData.updateType) {
			case 'CREATE':
				serviceResult = BoardService.insertScenario({
					name: scenarioData.name,
					featureId: server.featureId,
				});
				break;
			case 'UPDATE':
				serviceResult = BoardService.updateScenario(
					{
						name: scenarioData.name,
						featureId: server.featureId,
					},
					scenarioData.codeBlockId
				);
				break;
			case 'DELETE':
				serviceResult = BoardService.deleteScenario(scenarioData.codeBlockId);
				break;
			default:
				throw new Error('updateType is not specified');
		}
		serviceResult
			.then((saved) => {
				scenarioData.codeBlockId = saved._id;
				server.io.to(server.featureId).emit('board-scenario-update', scenarioData);
			})
			.catch((e) => {});
	},

	featureUpdate: (server, featureData) => {
		FeatureService.updateFeature(server.featureId, featureData)
			.then(() => {
				server.io.to(server.featureId).emit('board-feature-update', featureData);
			})
			.catch((e) => {});
	},
};

module.exports = BoardEvents;
