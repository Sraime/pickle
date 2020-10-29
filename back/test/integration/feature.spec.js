const request = require('axios');
const { Validator } = require('jsonschema');
const config = require('../../config');
const FeatureModel = require('../../app/models/feature.model');
const ScenarioModel = require('../../app/models/scenario.model');
const UserModel = require('../../app/models/user.model');
const featureGetResponseSchema = require('./schemas/feature/feature-get-response.json');
const featureScenarioGetResponseSchema = require('./schemas/feature/feature-scenario-get-response.json');
const featurePostResponseSchema = require('./schemas/feature/feature-post-response.json');

const BASE_URI = `http://localhost:${config.app.port}`;

describe('featrure', () => {
	let reqOptions;
	const validator = new Validator();
	const existingFeature = {
		name: 'existing feature',
	};
	let nfeature;
	let nscenario;
	let nuser;

	const existingUser = {
		pseudo: 'admin',
		email: 'admin.admin@admin.com',
		password: 'admin',
	};

	let existingScenario = {
		name: 'SC1',
		givenSteps: [{ name: 'step1' }],
	};

	let connectionToken;

	beforeAll(async () => {
		// create a simple user
		nuser = new UserModel(existingUser);
		await nuser.save();

		// get connection token
		const res = await request({
			url: `${BASE_URI}/auth/signin`,
			method: 'POST',
			data: {
				email: existingUser.email,
				password: existingUser.password,
			},
		});

		// create a simple feature
		existingFeature.userId = nuser._id;
		nfeature = new FeatureModel(existingFeature);
		await nfeature.save();

		// create a simple scenario
		existingScenario.featureId = nfeature._id;
		nscenario = new ScenarioModel(existingScenario);
		await nscenario.save();

		connectionToken = res.data.token;
	});

	afterAll(async () => {
		await UserModel.deleteOne({ pseudo: existingUser.pseudo });
		await FeatureModel.deleteOne({ name: existingFeature.name });
		await ScenarioModel.deleteOne({ name: existingScenario.name });
	});

	beforeEach(() => {
		reqOptions = {
			json: true,
		};
		reqOptions.url = `${BASE_URI}/feature`;
	});

	describe('GET /feature/:featureId', () => {
		beforeEach(() => {
			reqOptions.method = 'GET';
		});

		it('should return the existing feature', async () => {
			reqOptions.url = reqOptions.url + '/' + nfeature._id;
			const res = await request(reqOptions);
			expect(validator.validate(res.data, featureGetResponseSchema).errors).toHaveLength(0);
		});

		it('should return a 404 status code when the resquested feature does not exist', async () => {
			reqOptions.url = reqOptions.url + '/5e99b8a2311117186315365f';
			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 404,
				},
			});
		});
	});

	describe('GET /feature/:featureId/codeblock', () => {
		beforeEach(() => {
			reqOptions.method = 'GET';
		});

		it('should return scenario of the requested feature', async () => {
			reqOptions.url = reqOptions.url + '/' + nfeature._id + '/codeblock';
			const res = await request(reqOptions);
			expect(validator.validate(res.data, featureScenarioGetResponseSchema).errors).toHaveLength(0);
		});

		it('should return a 400 status code when the resquested feature id is not valid', async () => {
			reqOptions.url = reqOptions.url + '/InvalidFeatureID/codeblock';
			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 400,
				},
			});
		});
	});

	describe('POST /feature', () => {
		beforeEach(() => {
			reqOptions.method = 'POST';
		});

		it('should return newly created feature', async () => {
			reqOptions.data = {
				name: 'new feature',
			};
			reqOptions.headers = { Authorization: `Bearer ${connectionToken}` };
			const res = await request(reqOptions);
			expect(validator.validate(res.data, featurePostResponseSchema).errors).toHaveLength(0);
			expect(res.data.name).toEqual(reqOptions.data.name);
			expect(res.data.userId + '').toEqual(nuser._id + '');
		});

		it('should return a 401 when the user is not logged in', async () => {
			reqOptions.data = {
				name: 'new feature',
			};
			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 401,
				},
			});
		});
	});
});
