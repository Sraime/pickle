const mongoose = require('mongoose');
const { createLogger, format, transports, loggers } = require('winston');

const { combine, printf } = format;
const UserModel = require('../../app/models/user.model');
const config = require('../../config');

const cleanUpDb = async () => {
	await UserModel.deleteMany({});
};

// eslint-disable-next-line no-shadow
const loggerFormat = printf(({ level, message }) => {
	return `[LOG-${level}]: ${message}`;
});

const logger = createLogger({
	format: combine(loggerFormat),
	transports: [ new transports.Console() ]
});

loggers.add('test-logs', logger);

beforeAll(async () => {
	if (mongoose.connection.readyState === 0) {
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
	}
	await cleanUpDb();
});

afterAll(async () => {
	await cleanUpDb();
	mongoose.connection.close().then(() => {}).catch((e) =>
		logger.log({
			level: 'error',
			message: `DB closing error !${e}`
		})
	);
});
