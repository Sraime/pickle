const usersConnectedRooms = new Map();

const RoomService = {
	ioServer: null,
	joinRoom: (socket, roomId) => {
		if (!roomId) {
			throw new Error('invalid room id');
		}
		socket.join(roomId);
		let userRooms = usersConnectedRooms.get(socket.id);
		if (userRooms !== null) {
			userRooms = [];
			usersConnectedRooms.set(socket.id, userRooms);
		}
		userRooms.push(roomId);
	},

	leaveRoom: (socket, roomId) => {
		let userRooms = usersConnectedRooms.get(socket.id);
		if (userRooms) {
			const roomIndex = userRooms.indexOf(roomId);
			if (roomIndex > -1) {
				socket.leave(roomId);
				userRooms.splice(roomIndex, 1);
			}
		}
	},
	roomEmit: (roomId, eventName, data) => {
		RoomService.ioServer.to(roomId).emit(eventName, data);
	},
};

module.exports = RoomService;
