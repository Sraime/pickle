var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    pseudo: {
        type: String, 
    },
    email: {
        type: String
    },
    password: {
        type: String
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

module.exports = mongoose.model("user", userSchema);