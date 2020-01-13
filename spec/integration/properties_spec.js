const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/properties/";

const sequelize = require("../../src/db/models/index").sequelize;
const Property = require("../../src/db/models").Property;
const User = require("../../src/db/models").User;

describe("routes : properties", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        this.newProperty = {
            key: "bestDessert",
            value: "Pumpkin Crunch Cake",
            whichUserCreated: "jrigney@gty.org",
            whichUserLastChanged: "jrigney@gty.org"
        };
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
                    Property.findOne({ where: { key: this.propertyCreationOptions.form.key }})
                        .then((property) => {
                            expect(property).not.toBeNull();
                            expect(property.id).toBe(1);
                            expect(property.key).toBe(this.propertyCreationOptions.form.key);
                            expect(property.value).toBe(this.propertyCreationOptions.form.value);
                            expect(property.whichUserCreated).toBe(this.propertyCreationOptions.form.whichUserCreated);
                            expect(property.whichUserLastChanged).toBe(this.propertyCreationOptions.form.whichUserLastChanged);
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
                            Property.findAll({ where: { key: property.key }})
                                .then((properties) => {
                                    expect(properties.length).toEqual(1);
                                    expect(JSON.parse(body).err.name).toEqual("SequelizeUniqueConstraintError");
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
                    const returnedProperty = JSON.parse(body).property;
                    expect(returnedProperty.value).toEqual(this.newProperty.value);
                    done();
                }
            );
        });
        it("Should return the appropriate error when a nonexistent key is supplied.", (done) => {
            request.get(`${base}bestCollegeFootballTeam`,
                (err, res, body) => {
                    expect(JSON.parse(body)).toEqual({ err: "Property with that key doesn't exist." });
                    done();
                }
            );
        });
    });

    describe("POST /properties/:key/update", () => {
        beforeEach((done) => {
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
                    changingUser: "shepard@n7.gov",
                    updatedProperty: {
                        key: "bestDessert",
                        value: "Raspberry Crunch Cake"
                    }
                }
            };
            this.propertyUpdateUserOptions = {
                email: "shepard@n7.gov",
                password: "M1nerals21",
                passwordConfirmation: "M1nerals21",
                firstName: "John",
                lastName: "Shepard",
                mobilePhone: "5804361776",
                canChangeProps: true
            };
        });
        it("Should return the updated Property object when the update endpoint is provided with acceptable field values.", (done) => {
            User.create(this.propertyUpdateUserOptions)
                .then((user) => {
                    request.post(this.propertyUpdateOptions,
                        (err, res, body) => {
                            const returnedProperty = JSON.parse(body).property;
                            expect(returnedProperty.value).toEqual(this.propertyUpdateOptions.form.updatedProperty.value);
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
                    expect(JSON.parse(body)).toEqual({ err: "Property with that key doesn't exist." });
                    done();
                }
            );
        });
        it("Should return the appropriate error when an unregistered user email is supplied.", (done) => {
            request.post(this.propertyUpdateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body)).toEqual({ err: "User with that email doesn't exist." });
                    done();
                }
            );
        });
        it("Should return the appropriate error when a user email is supplied who doesn't have property editing privileges.", (done) => {
            this.propertyUpdateUserOptions.canChangeProps = false;
            User.create(this.propertyUpdateUserOptions)
                .then((user) => {
                    request.post(this.propertyUpdateOptions,
                        (err, res, body) => {
                            expect(JSON.parse(body)).toEqual({ err: "User with that email lacks permission to change properties." });
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
