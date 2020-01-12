const request = require('request-promise-native');
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
		password: 'admin'
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
			json: true
		};
	});

	describe('/auth/signin', () => {
		beforeEach(() => {
			reqOptions.uri = `${BASE_URI}/auth/signin`;
			reqOptions.method = 'POST';
		});

		it('should return a token', async () => {
			reqOptions.body = {
				email: 'admin.admin@admin.com',
				password: 'admin'
			};
			const res = await request(reqOptions);
			expect(validator.validate(res, loginResponseSchema).errors).toHaveLength(0);
		});

		it('should throw a 400 status code when email is not valid', async () => {
			reqOptions.body = {
				email: 'test.test@test.com',
				password: 'xxxxx'
			};
			await expect(request(reqOptions)).rejects.toMatchObject({
				statusCode: 400
			});
		});

		it('should throw a 400 status code when password is not valid', async () => {
			reqOptions.body = {
				email: 'admin.admin@admin.com',
				password: 'xxxxx'
			};
			await expect(request(reqOptions)).rejects.toMatchObject({
				statusCode: 400
			});
		});
	});

	describe('/auth/signup', () => {
		const userToCreate = {
			pseudo: 'Tym',
			email: 'tym.tym@tym.com',
			password: 'Tymtym01'
		};

		beforeEach(() => {
			reqOptions.uri = `${BASE_URI}/auth/signup`;
			reqOptions.method = 'POST';
		});

		it('should create a user', async () => {
			const nuser = userToCreate;
			reqOptions.body = nuser;
			const res = await request(reqOptions);
			expect(validator.validate(res, signupResponseSchema).errors).toHaveLength(0);
			await UserModel.deleteOne({ pseudo: userToCreate.pseudo });
		});

		it('should return an error when email is not in the good format', async () => {
			const nuser = _.clone(userToCreate);
			nuser.email = 'aaaa@aaaa';
			reqOptions.body = nuser;
			await expect(request(reqOptions)).rejects.toMatchObject({
				statusCode: 400
			});
		});
		it('should return an error when pseudo contains special chars', async () => {
			const nuser = _.clone(userToCreate);
			nuser.pseudo = 'aaaa.';
			reqOptions.body = nuser;
			await expect(request(reqOptions)).rejects.toMatchObject({
				statusCode: 400
			});
		});

		it('should return an array of one error when pseudo already exist', async () => {
			const nuser = _.clone(userToCreate);
			nuser.pseudo = 'admin';
			reqOptions.body = nuser;
			await expect(request(reqOptions)).rejects.toMatchObject({
				statusCode: 400,
				response: {
					body: [ [ 'pseudo', [ 'unique' ] ] ]
				}
			});
		});

		it('should return an array of one error when email already exist', async () => {
			const nuser = _.clone(userToCreate);
			nuser.email = 'admin.admin@admin.com';
			reqOptions.body = nuser;
			await expect(request(reqOptions)).rejects.toMatchObject({
				statusCode: 400,
				response: {
					body: [ [ 'email', [ 'unique' ] ] ]
				}
			});
		});

		it('should return an array of two error when email et pseudo already exist', async () => {
			const nuser = _.clone(userToCreate);
			nuser.email = 'admin.admin@admin.com';
			nuser.pseudo = 'admin';
			reqOptions.body = nuser;
			try {
				await request(reqOptions);
			} catch (e) {
				expect(e.statusCode).toEqual(400);
				expect(e.response.body).toContainEqual([ 'email', [ 'unique' ] ]);
				expect(e.response.body).toContainEqual([ 'pseudo', [ 'unique' ] ]);
			}
		});
	});
});
