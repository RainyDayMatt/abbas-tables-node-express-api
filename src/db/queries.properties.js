const Property = require("./models/").Property;
const User = require("./models/").User;

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
        return Property.findOne({ where: { key: key }})
            .then((property) => {
                if (!property) {
                    callback("Property with that key doesn't exist.");
                } else {
                    callback(null, property);
                }
            })
            .catch((err) => {
                callback(err);
            });
    },
    updateProperty(key, updatedProperty, updatingUserEmail, callback) {
        return Property.findOne({ where: { key: key }})
            .then((property) => {
                if (!property) {
                    callback("Property with that key doesn't exist.");
                } else {
                    User.findOne({ where: { email: updatingUserEmail }})
                        .then((user) => {
                            if (!user) {
                                callback("User with that email doesn't exist.");
                            } else {
                                if (!user.canChangeProps) {
                                    callback("User with that email lacks permission to change properties.");
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
                        })
                }
            })
            .catch((err) => {
                callback(err);
            });
    }
};
