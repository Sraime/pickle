const ProjectFeatureController = require('./project.controller');
const ProjectFeatureService = require('../../services/project-feature/project-feature.service');

jest.mock('../../services/project-feature/project-feature.service');

describe('user-feature controller', () => {
	let req;
	let res = {
		json: jest.fn(),
		send: jest.fn(),
		status: jest.fn(),
	};

	beforeEach(() => {
		req = {};
		res.params = {};
		res.status.mockReturnValue(res);
	});

	afterEach(() => {
		res.json.mockClear();
		res.send.mockClear();
		res.status.mockClear();
	});

	describe('getFeatures()', () => {
		const simpleUserFeatures = [{ _id: 'xxx', name: 'f1' }];
		ProjectFeatureService.getUserFeatures.mockReturnValue(simpleUserFeatures);

		beforeEach(() => {
			req.params = { pseudo: 'bob' };
		});

		afterEach(() => {
			ProjectFeatureService.getUserFeatures.mockClear();
		});

		it('should return the result of the service as a json response', async () => {
			req.user = {
				pseudo: 'bob',
			};
			await ProjectFeatureController.getUserFeatures(req, res);
			expect(res.json).toHaveBeenCalledWith(simpleUserFeatures);
		});

		it('should return an error code 403 when the user pseudo is not the same as the logged in user', async () => {
			req.user = {
				pseudo: 'lili',
			};
			await ProjectFeatureController.getUserFeatures(req, res);
			expect(res.status).toHaveBeenCalledWith(403);
			expect(res.send).toHaveBeenCalled();
		});
	});
});
