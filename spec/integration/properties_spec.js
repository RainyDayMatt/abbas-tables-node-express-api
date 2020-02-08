const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/properties/";

const sequelize = require("../../src/db/models/index").sequelize;
const Property = require("../../src/db/models").Property;
const User = require("../../src/db/models").User;

const propertyFactory = require("../../src/support/factories/propertyFactory");
const userFactory = require("../../src/support/factories/userFactory");
const errorMessages = require("../../src/support/dictionaries/errorMessages");

describe("routes : properties", () => {
    beforeEach((done) => {
        this.newProperty = propertyFactory.get();
        sequelize.sync({ force: true })
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    describe("POST /properties", () => {
        beforeEach((done) => {
            this.propertyCreationOptions = {
                url: base,
                form: this.newProperty
            };
            done();
        });
        it("Should create a Property object with valid values and return it.", (done) => {
            request.post(this.propertyCreationOptions,
                (err, res, body) => {
                    Property.findOne({ where: { key: this.propertyCreationOptions.form.key } })
                        .then((property) => {
                            expect(property).not.toBeNull();
                            expect(property.id).toBe(1);
                            expect(property.key).toBe(this.propertyCreationOptions.form.key);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a Property object with a duplicate key.", (done) => {
            Property.create(this.propertyCreationOptions.form)
                .then((property) => {
                    request.post(this.propertyCreationOptions,
                        (err, res, body) => {
                            Property.findAll({ where: { key: property.key } })
                                .then((properties) => {
                                    expect(properties.length).toEqual(1);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getPropertyCreationErrorMessages().keyIsNotUnique);
                                    done();
                                })
                                .catch((err) => {
                                    console.log(err);
                                    done();
                                });
                        }
                    );
                })
                .catch((err) => {
                    fail("Error creating first property for duplicate key creation failure spec in Property integration test.");
                    done();
                });
        });
        it("Should not create a Property object with an invalid creating user value.", (done) => {
            this.propertyCreationOptions.form.whichUserCreated = "ShepardAtn7Dotgov";
            request.post(this.propertyCreationOptions,
                (err, res, body) => {
                    Property.findOne({ where: { whichUserCreated: this.propertyCreationOptions.form.whichUserCreated } })
                        .then((property) => {
                            expect(property).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getPropertyCreationErrorMessages().whichUserCreatedEmailIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a Property object with an invalid last changing user value.", (done) => {
            this.propertyCreationOptions.form.whichUserLastChanged = "ShepardAtn7Dotgov";
            request.post(this.propertyCreationOptions,
                (err, res, body) => {
                    Property.findOne({ where: { whichUserLastChanged: this.propertyCreationOptions.form.whichUserLastChanged } })
                        .then((property) => {
                            expect(property).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getPropertyCreationErrorMessages().whichUserLastChangedEmailIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
    });

    describe("GET /properties/:key", () => {
        beforeEach((done) => {
            Property.create(this.newProperty)
                .then((property) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should return the associated Property object when the correct key is supplied.", (done) => {
            request.get(`${base}${this.newProperty.key}`,
                (err, res, body) => {
                    expect(JSON.parse(body).property.value).toEqual(this.newProperty.value);
                    done();
                }
            );
        });
        it("Should return the appropriate error when a nonexistent key is supplied.", (done) => {
            request.get(`${base}bestCollegeFootballTeam`,
                (err, res, body) => {
                    expect(JSON.parse(body).err).toBe(errorMessages.getPropertyUpdateErrorMessages().keyDoesNotExist);
                    done();
                }
            );
        });
    });

    describe("POST /properties/:key/update", () => {
        beforeEach((done) => {
            this.propertyUpdateUser = userFactory.get();
            this.propertyUpdateUser.canChangeProps = true;
            Property.create(this.newProperty)
                .then((property) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            this.propertyUpdateOptions = {
                url: `${base}${this.newProperty.key}/update`,
                form: {
                    changingUser: this.propertyUpdateUser.email,
                    updatedProperty: {
                        key: "bestDessert",
                        value: "Raspberry Crunch Cake"
                    }
                }
            };
        });
        it("Should return the updated Property object when the update endpoint is provided with acceptable field values.", (done) => {
            User.create(this.propertyUpdateUser)
                .then((user) => {
                    request.post(this.propertyUpdateOptions,
                        (err, res, body) => {
                            expect(JSON.parse(body).property.value).toEqual(this.propertyUpdateOptions.form.updatedProperty.value);
                            done();
                        }
                    );
                })
                .catch((err) => {
                    fail("Error creating user for update success spec in Property integration test.");
                    done();
                });
        });
        it("Should return the appropriate error when a nonexistent key is supplied.", (done) => {
            this.propertyUpdateOptions.url = `${base}bestCollegeFootballTeam/update`;
            request.post(this.propertyUpdateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err).toBe(errorMessages.getPropertyUpdateErrorMessages().keyDoesNotExist);
                    done();
                }
            );
        });
        it("Should return the appropriate error when an unregistered user email is supplied.", (done) => {
            request.post(this.propertyUpdateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err).toBe(errorMessages.getPropertyUpdateErrorMessages().userDoesNotExist);
                    done();
                }
            );
        });
        it("Should return the appropriate error when a user email is supplied who doesn't have property editing privileges.", (done) => {
            this.propertyUpdateUser.canChangeProps = false;
            User.create(this.propertyUpdateUser)
                .then((user) => {
                    request.post(this.propertyUpdateOptions,
                        (err, res, body) => {
                            expect(JSON.parse(body).err).toBe(errorMessages.getPropertyUpdateErrorMessages().userCannotChangeProperties);
                            done();
                        }
                    );
                })
                .catch((err) => {
                    fail("Error creating user for insufficient privileges update failure spec in Property integration test.");
                    done();
                });
        });
    });
});
