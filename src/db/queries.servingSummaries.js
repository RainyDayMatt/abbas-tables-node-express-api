const ServingSummary = require("./models/").ServingSummary;
const User = require("./models/").User;

module.exports = {
    createServingSummary(newServingSummary, callback) {
        return User.findOne({ where: { email: newServingSummary.whichUserCreated } })
            .then((user) => {
                if (!user) {
                    callback("User with that email doesn't exist.");
                } else {
                    if (!user.canEnterMealCount) {
                        callback("User with that email lacks permission to enter meal counts.");
                    } else {
                        ServingSummary.create(newServingSummary)
                            .then((servingSummary) => {
                                callback(null, servingSummary);
                            })
                            .catch((err) => {
                                callback(err);
                            });
                    }
                }
            });
    },
    getServingSummary(year, month, day, callback) {
        return ServingSummary.findOne({ where: { year: year, month: month, day: day } })
            .then((servingSummary) => {
                if (!servingSummary) {
                    callback("Serving summary with that date doesn't exist.");
                } else {
                    callback(null, servingSummary);
                }
            })
            .catch((err) => {
                callback(err);
            });
    },
    updateServingSummary(year, month, day, updatedServingSummary, updatingUserEmail, callback) {
        return ServingSummary.findOne({ where: { year: year, month: month, day: day } })
            .then((servingSummary) => {
                if (!servingSummary) {
                    callback("Serving summary with that date doesn't exist.");
                } else {
                    User.findOne({ where: { email: updatingUserEmail } })
                        .then((user) => {
                            if (!user) {
                                callback("User with that email doesn't exist.");
                            } else {
                                if (!user.canEnterMealCount) {
                                    callback("User with that email lacks permission to enter meal counts.");
                                } else {
                                    servingSummary.update(updatedServingSummary, {
                                        fields: Object.keys(updatedServingSummary)
                                    })
                                        .then((updatedServingSummary) => {
                                            callback(null, updatedServingSummary);
                                        })
                                        .catch((err) => {
                                            callback(err);
                                        });
                                }
                            }
                        });
                }
            })
            .catch((err) => {
                callback(err);
            });
    }
};
