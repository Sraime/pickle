
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { createLogger, format, transports, loggers } = require('winston');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const { combine, timestamp, printf } = format;
const routes = require('./app/routes');
const config = require('./config');
const BoardEventHandler = require('./app/sockets/board/board-events-handler');


// eslint-disable-next-line no-shadow
const loggerFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [LOG-${level}]: ${message}`;
});

const logger = createLogger({
	format: combine(timestamp(), loggerFormat),
	transports: [ new transports.Console() ]
});

loggers.add('default', logger);

// Set up default mongoose connection
const mongoDB = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;
mongoose
	.connect(mongoDB, { useNewUrlParser: true })
	.then(() => {
		logger.log({
			level: 'info',
			message: 'Connection to database has been established successfully.'
		});
	})
	.catch((err) => {
		logger.log({
			level: 'info',
			message: `Unable to connect to the database ${err}`
		});
	});

app.use(cors({ origin: true, credentials: true }));


app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use(function(req, res, next) {
	logger.log({
		level: 'info',
		message: `received : ${req.method} ${req.originalUrl} (Authorization: ${req.get('Authorization')})`
	});
	next();
});
app.use('/', routes);

server.listen(config.app.port, function() {
	logger.log({
		level: 'info',
		message: `[ENV=${config.app.env}] Application running on port ${config.app.port}`
	});
});

io.on("connection", (socket) => {
	const server = {
		socket,
		io
	};
	BoardEventHandler(server)
});