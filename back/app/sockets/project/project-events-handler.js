const ProjectEvents = require('./project-events');

const ProjectEventsHandler = (server) => {
	server.socket.on('project-join', (data) => ProjectEvents.joinProject(server, data));
};

module.exports = ProjectEventsHandler;
