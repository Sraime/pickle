const userService = require('../../services/users/user.service');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const errorParser = require('../../tools/ValidationErrorParser/validation-error-parser');

const AuthController = {

    singin: async (req, res) => {
        const user = await userService.getUserByEmail(req.body.email);
        if(user === null) {
            return res.status(400).send();
        }
        let isValid = await userService.isCorrectPassword(req.body.password, user.password);
        if(!isValid) {
            return res.status(400).send();
        }
        const token = jwt.sign({id: user.id, pseudo: user.pseudo},config.auth.secret, {
           // algorithm: 'RS256',
            expiresIn: config.auth.expiresIn,
            subject: user.id.toString()
        });
        res.json({pseudo: user.pseudo, token: token, tokenExpiration: Date.now() + config.auth.expiresIn*1000});
    },

    signup: async (req, res) => {
        try{
            let result = await userService.insertUser(req.body);
            return res.json({id: result.id, pseudo: result.pseudo, email: result.email});
        }catch(err) {
            res.status(400).send(errorParser.parseError(err));
        }
    }
}

module.exports = AuthController;