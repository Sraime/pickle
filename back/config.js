const env = process.env.NODE_ENV || 'dev';

const dev = {
	app: {
		env,
		port: 3000
	},
	auth: {
		secret: process.env.AUTH_SECRET || 'randomsecretpassword',
		expiresIn: 3600
	},
	mongodb: {
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT) || 27017,
		db: process.env.DB_NAME || 'pickle'
	}
};

const test = {
	app: {
		env,
		port: 3001
	},
	auth: {
		secret: process.env.AUTH_SECRET || 'randomsecretpassword',
		expiresIn: 3600
	},
	mongodb: {
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT) || 27017,
		db: process.env.DB_NAME || 'pickle_test'
	}
};

const prod = {
	app: {
		env,
		port: 3000
	},
	auth: {
		secret: process.env.AUTH_SECRET,
		expiresIn: 3600
	},
	mongodb: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		db: process.env.DB_NAME
	}
};
const config = {
	dev,
	test,
	prod
};
module.exports = config[env];
