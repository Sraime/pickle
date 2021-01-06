const BoardEvents = require('./board-events');

const BoardEventsHandler = (server) => {
	server.socket.on('board-join', (data) => BoardEvents.joinBoard(server, data));
	server.socket.on('board-leave', (data) => BoardEvents.leaveBoard(server, data));
	server.socket.on('board-section-update', (data) => BoardEvents.sectionUpdate(server, data));
	server.socket.on('board-scenario-update', (data) => BoardEvents.scenarioUpdate(server, data));
	server.socket.on('board-feature-update', (data) => BoardEvents.featureUpdate(server, data));
};

module.exports = BoardEventsHandler;
