var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const { isEmail, isAlphanumeric } = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
    pseudo: {
        type: String, 
        unique: true, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 15,
        validate: [ isAlphanumeric, 'only letters and numbers' ]
    },
    email: {
        type: String, 
        unique: true, 
        required: true, 
        maxlength: 30,
        validate: [ isEmail, 'invalid email' ]
    },
    password: {
        type: String, 
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20
    }
},{timestamps: true})

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);