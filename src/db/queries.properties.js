const Property = require("./models/").Property;
const User = require("./models/").User;

const errorMessages = require("../support/dictionaries/errorMessages");

module.exports = {
    createProperty(newProperty, callback) {
        return Property.create(newProperty)
            .then((property) => {
                callback(null, property);
            })
            .catch((err) => {
                callback(err);
            });
    },
    getProperty(key, callback) {
        return Property.findOne({ where: { key: key } })
            .then((property) => {
                if (!property) {
                    callback(errorMessages.getPropertyUpdateErrorMessages().keyDoesNotExist);
                } else {
                    callback(null, property);
                }
            })
            .catch((err) => {
                callback(err);
            });
    },
    updateProperty(key, updatedProperty, updatingUserEmail, callback) {
        return Property.findOne({ where: { key: key } })
            .then((property) => {
                if (!property) {
                    callback(errorMessages.getPropertyUpdateErrorMessages().keyDoesNotExist);
                } else {
                    User.findOne({ where: { email: updatingUserEmail } })
                        .then((user) => {
                            if (!user) {
                                callback(errorMessages.getPropertyUpdateErrorMessages().userDoesNotExist);
                            } else {
                                if (!user.canChangeProps) {
                                    callback(errorMessages.getPropertyUpdateErrorMessages().userCannotChangeProperties);
                                } else {
                                    property.update(updatedProperty, {
                                        fields: Object.keys(updatedProperty)
                                    })
                                        .then((updatedProperty) => {
                                            callback(null, updatedProperty);
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
