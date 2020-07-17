const request = require('request-promise-native');
const { Validator } = require('jsonschema');
const config = require('../../config');
const FeatureModel = require('../../app/models/feature.model');
const ScenarioModel = require('../../app/models/scenario.model');
const featureGetResponseSchema = require('./schemas/feature/feature-get-response.json');
const featureScenarioGetResponseSchema = require('./schemas/feature/feature-scenario-get-response.json');

const BASE_URI = `http://localhost:${config.app.port}`;

describe('featrure', () => {
	let reqOptions;
	const validator = new Validator();
	const existingFeature = {
		name: 'existing feature',
	};
	let existingScenario;
	let nfeature;
	let nscenario;

	beforeAll(async () => {
		nfeature = new FeatureModel(existingFeature);
		await nfeature.save();

		existingScenario = {
			name: 'SC1',
			featureId: nfeature._id,
			givenSteps: [{ name: 'step1' }],
		};
		nscenario = new ScenarioModel(existingScenario);
		await nscenario.save();
	});

	afterAll(async () => {
		await FeatureModel.deleteOne({ name: existingFeature.name });
		await ScenarioModel.deleteOne({ name: existingScenario.name });
	});

	beforeEach(() => {
		reqOptions = {
			json: true,
		};
		reqOptions.uri = `${BASE_URI}/feature`;
		reqOptions.method = 'GET';
	});

	describe('/feature/:featureId', () => {
		it('should return the existing feature', async () => {
			reqOptions.uri = reqOptions.uri + '/' + nfeature._id;
			const res = await request(reqOptions);
			expect(validator.validate(res, featureGetResponseSchema).errors).toHaveLength(0);
		});

		it('should return a 404 status code when the resquested feature does not exist', async () => {
			reqOptions.uri = reqOptions.uri + '/5e99b8a2311117186315365f';
			await expect(request(reqOptions)).rejects.toMatchObject({
				statusCode: 404,
			});
		});
	});

	describe('/feature/:featureId/codeblock', () => {
		it('should return scenario of the requested feature', async () => {
			reqOptions.uri = reqOptions.uri + '/' + nfeature._id + '/codeblock';
			const res = await request(reqOptions);
			expect(validator.validate(res, featureScenarioGetResponseSchema).errors).toHaveLength(0);
		});

		it('should return a 400 status code when the resquested feature id is not valid', async () => {
			reqOptions.uri = reqOptions.uri + '/InvalidFeatureID/codeblock';
			await expect(request(reqOptions)).rejects.toMatchObject({
				statusCode: 400,
			});
		});
	});
});
