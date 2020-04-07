const BoardEvents = require('./board-events');

const BoardEventsHandler = (server) => {
  server.socket.on('section-update', (data) => BoardEvents.sectionUpdate(server, data));
  server.socket.on('scenario-update', (data) => BoardEvents.scenarioUpdate(server, data));
}

module.exports = BoardEventsHandler;