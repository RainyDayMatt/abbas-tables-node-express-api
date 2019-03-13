const User = require("./models/").User;
const bcrypt = require("bcryptjs");

module.exports = {
    createUser(newUser, callback) {
        let salt = bcrypt.genSaltSync();
        let hashedPassword = bcrypt.hashSync(newUser.password, salt);
        return User.create({
            email: newUser.email,
            password: hashedPassword,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            canEnterMealCount: newUser.canEnterMealCount,
            canChangeProps: newUser.canChangeProps,
            canCreateNewsItems: newUser.canCreateNewsItems,
            canEditNewsItems: newUser.canEditNewsItems,
            canDeleteNewsItems: newUser.canDeleteNewsItems,
            canCreateNewsItemComments: newUser.canCreateNewsItemComments,
            canEditNewsItemComments: newUser.canEditNewsItemComments,
            canDeleteNewsItemComments: newUser.canDeleteNewsItemComments,
            canChangeRoles: newUser.canChangeRoles
        })
            .then((user) => {
                callback(null, user);
            })
            .catch((err) => {
                callback(err);
            });
    },
    getUserLazy(user, callback) {
        User.findOne({where: {email: user.email}})
            .then((returnedUser) => {
                if (!returnedUser) {
                    callback("Account with that email doesn't exist.")
                }
                else if (bcrypt.compareSync(user.password, returnedUser.password)) {
                    callback(null, returnedUser);
                } else {
                    callback("Incorrect password.");
                }
            })
            .catch((err) => {
                callback(err);
            });
    }
};
