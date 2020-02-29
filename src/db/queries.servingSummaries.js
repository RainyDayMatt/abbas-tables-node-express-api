const ServingSummary = require("./models/").ServingSummary;
const User = require("./models/").User;

const errorMessages = require("../support/dictionaries/errorMessages");

module.exports = {
    checkServingSummaryDateAvailability(year, month, day, callback) {
        return ServingSummary.findAll({ where: { year: year, month: month, day: day } })
            .then((servingSummaries) => {
                if (servingSummaries.length > 0) {
                    callback(errorMessages.getServingSummaryCreationErrorMessages().dateIsNotUnique);
                } else {
                    callback(null);
                }
            });
    },
    createServingSummary(newServingSummary, creatingUserEmail, callback) {
        return User.findOne({ where: { email: creatingUserEmail } })
            .then((user) => {
                if (!user) {
                    callback([ errorMessages.getServingSummaryCreationErrorMessages().userDoesNotExist ]);
                } else {
                    if (!user.canEnterMealCount) {
                        callback([ errorMessages.getServingSummaryCreationErrorMessages().userCannotEnterMealCounts ]);
                    } else {
                        ServingSummary.create(newServingSummary)
                            .then((servingSummary) => {
                                callback(null, servingSummary);
                            })
                            .catch((err) => {
                                callback([ err ]);
                            });
                    }
                }
            });
    },
    getServingSummary(year, month, day, callback) {
        return ServingSummary.findOne({ where: { year: year, month: month, day: day } })
            .then((servingSummary) => {
                if (!servingSummary) {
                    callback([ errorMessages.getServingSummaryUpdateErrorMessages().dateDoesNotExist ]);
                } else {
                    callback(null, servingSummary);
                }
            })
            .catch((err) => {
                callback([ err ]);
            });
    },
    updateServingSummary(year, month, day, updatedServingSummary, updatingUserEmail, callback) {
        return ServingSummary.findOne({ where: { year: year, month: month, day: day } })
            .then((servingSummary) => {
                if (!servingSummary) {
                    callback([ errorMessages.getServingSummaryUpdateErrorMessages().dateDoesNotExist ]);
                } else {
                    User.findOne({ where: { email: updatingUserEmail } })
                        .then((user) => {
                            if (!user) {
                                callback([ errorMessages.getServingSummaryUpdateErrorMessages().userDoesNotExist ]);
                            } else {
                                if (!user.canEnterMealCount) {
                                    callback([ errorMessages.getServingSummaryUpdateErrorMessages().userCannotEnterMealCounts ]);
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
