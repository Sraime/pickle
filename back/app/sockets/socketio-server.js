const BoardEventHandler = require('./board/board-events-handler');
const ProjectEventHandler = require('./project/project-events-handler');
const RoomService = require('./room-service');
const logger = require('winston');
let io;
const SocketioServer = {
	init: (ioServer) => {
		io = ioServer;
		RoomService.ioServer = ioServer;
		io.on('connection', (socket) => {
			logger.log({
				level: 'info',
				message: `socket connection : ${socket.id}`,
			});
			const server = {
				socket,
				io,
				session: {},
			};
			BoardEventHandler(server);
			ProjectEventHandler(server);
			socket.on('disconnect', () => {
				logger.log({
					level: 'info',
					message: `socket disconnection : ${socket.id}`,
				});
			});
		});
	},
};

module.exports = SocketioServer;
