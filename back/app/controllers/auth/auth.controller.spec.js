const userService = require('../../services/users/user.service');
const authController = require('./auth.controller')
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const errorParser = require('../../tools/ValidationErrorParser/validation-error-parser');
const _ = require('lodash');

describe('auth.controller', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {body: {}}
        res = {
            json: jest.fn(),
            send: jest.fn(),
            status: jest.fn()
        }
        res.status.mockReturnValue(res);
    });

    describe('signin', () => {

    
        beforeEach(() => {
            jest.spyOn(userService, 'getUserByEmail');
        });
    
        afterEach(() => {
            userService.getUserByEmail.mockRestore();
        });
    
        describe('user found', () => {
    
            req = {
                body: {
                    email : "xx.xx@xx.xx",
                    password: "given-password"
                }
            };
    
            const fakeUser = {
                id: "1",
                email: "xx.xx@xx.xx",
                pseudo: "toto",
                password: "encoded-password"
            }
    
            beforeEach(() => {
                userService.getUserByEmail.mockReturnValue(fakeUser);
                jest.spyOn(userService, 'isCorrectPassword');
            });
    
            afterEach(() => {
                userService.isCorrectPassword.mockRestore();
            });
    
            describe('valid password', () => {
    
                const token = "generated-token";
                const secret = "app-secret"
                const currentDate = 0;
    
                beforeEach(() => {
                    userService.isCorrectPassword.mockReturnValue(true);
                    jest.spyOn(jwt, 'sign').mockReturnValue(token);
                    config.auth.secret = secret;
                    config.auth.expiresIn = 10;
                    global.Date.now = jest.fn();
                    global.Date.now.mockReturnValue(currentDate);
                });
    
                afterEach(() => {
                    jwt.sign.mockRestore();
                });
    
    
                it('should return a token', async () => {
                    await authController.singin(req, res);
                    expect(userService.isCorrectPassword).toHaveBeenCalledWith(req.body.password, fakeUser.password);
                    expect(jwt.sign).toHaveBeenCalledWith({id: fakeUser.id, pseudo: fakeUser.pseudo}, secret, {
                        expiresIn: config.auth.expiresIn,
                        subject: fakeUser.id});
                    expect(res.json).toHaveBeenCalledWith({
                        pseudo: fakeUser.pseudo, 
                        token: token, 
                        tokenExpiration: currentDate + config.auth.expiresIn * 1000
                    });
                });
            });
            
            describe('not valid password', () => {
                beforeEach(() => {
                    userService.isCorrectPassword.mockReturnValue(false);
                });
    
                it('should return an error 400', async () => {
                    await authController.singin(req, res);
                    expect(res.status).toHaveBeenCalledWith(400);
                    expect(res.send).toHaveBeenCalledTimes(1);
                });
            });
        });
    
    
        it('should return an error 400 when the user is not found', async () => {
            userService.getUserByEmail.mockReturnValue(null);
            await authController.singin(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('signup', () => {
        let spyParseError 

        beforeEach(() => {
            jest.spyOn(userService, 'insertUser');
            errorParser.parseError = jest.fn();
        });
        
        it('should create "Tym" as a new user', async () => {
            const body = {pseudo : 'Tym', email : 'tym.tym@tym.com', password : 'Tym01'};
            userService.insertUser.mockReturnValue({});
            req.body = body;
            await authController.signup(req, res);
            expect(userService.insertUser).toHaveBeenCalledWith(body);
        });

        it('should return the newly created user without password', async () => {
            const createdUser = {
                id: 111111,
                pseudo : 'Tym', 
                email : 'tym.tym@tym.com', 
                password : 'XXXXX'
            };
            let responseUser = _.clone(createdUser);
            delete responseUser.password;
            req.body = {};
            userService.insertUser.mockReturnValue(createdUser);
            await authController.signup(req, res);
            expect(res.json).toHaveBeenCalledWith(responseUser);
        });
        
        it('should return an error when given data is not valid', async () => {
            userService.insertUser.mockImplementation(user => {
                throw new Error();
            });
            await authController.signup(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalled();
        });
        
        it('should return a parsed error in the body when the model is not valid', async () => {
            userService.insertUser.mockImplementation(user => {
                throw new Error();
            });
            const parsedError = [['pseudo',['minlength']]];
            errorParser.parseError.mockReturnValue(parsedError);
            await authController.signup(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(parsedError);
        });
    });
});
