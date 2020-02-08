const User = require("./models/").User;

const errorMessages = require("../support/dictionaries/errorMessages");

const bcrypt = require("bcryptjs");

module.exports = {
    checkUserEmailAvailability(email, callback) {
        User.findAll({ where: { email } })
            .then((users) => {
                if (users.length > 0) {
                    callback("Account with that email already exists.");
                } else {
                    callback(null);
                }
            });
    },
    createUser(newUser, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashedPassword;
        return User.create(newUser)
            .then((user) => {
                callback(null, user);
            })
            .catch((err) => {
                callback(err);
            });
    },
    getUserLazy(user, callback) {
        User.findOne({ where: { email: user.email } })
            .then((returnedUser) => {
                if (!returnedUser) {
                    callback(errorMessages.getUserSignInErrorMessages().emailIsNotRegistered)
                } else if (bcrypt.compareSync(user.password, returnedUser.password)) {
                    callback(null, returnedUser);
                } else {
                    callback(errorMessages.getUserSignInErrorMessages().passwordIsIncorrect);
                }
            })
            .catch((err) => {
                callback(err);
            });
    }
};
