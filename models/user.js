var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");

const SALT_FACTOR = 12;

var userSchema = mongoose.Schema({
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nic: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre("save", function (done) {
    var user = this;

    if (!user.isModified("password")) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, function (err, hashedPassword) {
            if (err) { return done(err); }

            user.password = hashedPassword;

            done();
        });
    });
});

userSchema.methods.checkPassword = function (guess, done) {
    if (this.password != null) {
        bcrypt.compare(guess, this.password, function (err, isMatch) {
            done(err, isMatch);
        });
    }
}

var User = mongoose.model("User", userSchema);

module.exports = User;