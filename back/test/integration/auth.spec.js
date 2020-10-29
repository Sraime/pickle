const request = require('axios');
const { Validator } = require('jsonschema');
const _ = require('lodash');
const loginResponseSchema = require('./schemas/auth/signin-response');
const signupResponseSchema = require('./schemas/auth/signup-response');
const UserModel = require('../../app/models/user.model');
const config = require('../../config');

const BASE_URI = `http://localhost:${config.app.port}`;
describe('auth', () => {
	let reqOptions;
	const validator = new Validator();
	const existingUser = {
		pseudo: 'admin',
		email: 'admin.admin@admin.com',
		password: 'admin',
	};

	beforeAll(async () => {
		const nuser = new UserModel(existingUser);
		await nuser.save();
	});

	afterAll(async () => {
		await UserModel.deleteOne({ pseudo: existingUser.pseudo });
	});

	beforeEach(() => {
		reqOptions = {
			json: true,
		};
	});

	describe('/auth/signin', () => {
		beforeEach(() => {
			reqOptions.url = `${BASE_URI}/auth/signin`;
			reqOptions.method = 'POST';
		});

		it('should return a token', async () => {
			reqOptions.data = {
				email: 'admin.admin@admin.com',
				password: 'admin',
			};
			const res = await request(reqOptions);
			expect(validator.validate(res.data, loginResponseSchema).errors).toHaveLength(0);
		});

		it('should throw a 400 status code when email is not valid', async () => {
			reqOptions.data = {
				email: 'test.test@test.com',
				password: 'xxxxx',
			};
			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 400,
				},
			});
		});

		it('should throw a 400 status code when password is not valid', async () => {
			reqOptions.data = {
				email: 'admin.admin@admin.com',
				password: 'xxxxx',
			};
			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 400,
				},
			});
		});
	});

	describe('/auth/signup', () => {
		const userToCreate = {
			pseudo: 'Tym',
			email: 'tym.tym@tym.com',
			password: 'Tymtym01',
		};

		beforeEach(() => {
			reqOptions.url = `${BASE_URI}/auth/signup`;
			reqOptions.method = 'POST';
		});

		it('should create a user', async () => {
			const nuser = userToCreate;
			reqOptions.data = nuser;
			const res = await request(reqOptions);
			expect(validator.validate(res.data, signupResponseSchema).errors).toHaveLength(0);
			await UserModel.deleteOne({ pseudo: userToCreate.pseudo });
		});

		it('should return an error when email is not in the good format', async () => {
			const nuser = _.clone(userToCreate);
			nuser.email = 'aaaa@aaaa';
			reqOptions.data = nuser;
			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 400,
				},
			});
		});
		it('should return an error when pseudo contains special chars', async () => {
			const nuser = _.clone(userToCreate);
			nuser.pseudo = 'aaaa.';
			reqOptions.data = nuser;
			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 400,
				},
			});
		});

		it('should return an array of one error when pseudo already exist', async () => {
			const nuser = _.clone(userToCreate);
			nuser.pseudo = 'admin';
			reqOptions.data = nuser;
			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 400,
					data: [['pseudo', ['unique']]],
				},
			});
		});

		it('should return an array of one error when email already exist', async () => {
			const nuser = _.clone(userToCreate);
			nuser.email = 'admin.admin@admin.com';
			reqOptions.data = nuser;

			await expect(request(reqOptions)).rejects.toMatchObject({
				response: {
					status: 400,
					data: [['email', ['unique']]],
				},
			});
		});

		it('should return an array of two error when email et pseudo already exist', async () => {
			const nuser = _.clone(userToCreate);
			nuser.email = 'admin.admin@admin.com';
			nuser.pseudo = 'admin';
			reqOptions.data = nuser;
			try {
				await request(reqOptions);
			} catch (e) {
				expect(e.response.status).toEqual(400);
				expect(e.response.data).toContainEqual(['email', ['unique']]);
				expect(e.response.data).toContainEqual(['pseudo', ['unique']]);
			}
		});
	});
});
