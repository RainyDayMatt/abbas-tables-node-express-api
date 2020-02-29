const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";

const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

const bcrypt = require("bcryptjs");

const userFactory = require("../../src/support/factories/userFactory");
const errorMessages = require("../../src/support/dictionaries/errorMessages");

describe("routes : users", () => {
    beforeEach((done) => {
        sequelize.sync({ force: true })
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    describe("POST /users", () => {
        beforeEach((done) => {
            this.userCreationOptions = {
                url: base,
                form: userFactory.get()
            };
            done();
        });
        it("Should create a User object with valid values and return it.", (done) => {
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).not.toBeNull();
                            expect(user.id).toBe(1);
                            expect(user.email).toBe(this.userCreationOptions.form.email);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should create a User object with correctly defaulted authorization flags when no values are provided.", (done) => {
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user.canEnterMealCount).toBe(false);
                            expect(user.canChangeProps).toBe(false);
                            expect(user.canCreateNewsItems).toBe(false);
                            expect(user.canEditNewsItems).toBe(false);
                            expect(user.canDeleteNewsItems).toBe(false);
                            expect(user.canCreateNewsItemComments).toBe(true);
                            expect(user.canEditNewsItemComments).toBe(false);
                            expect(user.canDeleteNewsItemComments).toBe(false);
                            expect(user.canChangeRoles).toBe(false);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with a duplicate email.", (done) => {
            User.create(this.userCreationOptions.form)
                .then((user) => {
                    request.post(this.userCreationOptions,
                        (err, res, body) => {
                            User.findAll({ where: { email: user.email } })
                                .then((users) => {
                                    expect(users.length).toBe(1);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().emailIsNotUnique);
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
                    fail("Error creating first user for duplicate email creation failure spec in User integration test.");
                    done();
                });
        });
        it("Should not create a User object with an invalid email.", (done) => {
            this.userCreationOptions.form.email = "ShepardAtn7Dotgov";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().emailIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid password (non-alphanumeric).", (done) => {
            this.userCreationOptions.form.password = "M1ner@ls21";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().passwordIsNotAlphanumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid password (too short).", (done) => {
            this.userCreationOptions.form.password = "M1ne";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().passwordLengthIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid password (too long).", (done) => {
            this.userCreationOptions.form.password = "M1neralsAreEv3rywh3reN0w";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().passwordLengthIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid first name (non-alpha).", (done) => {
            this.userCreationOptions.form.firstName = "J0hn";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().firstNameIsNotAlphabetic);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid first name (too short).", (done) => {
            this.userCreationOptions.form.firstName = "J";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().firstNameLengthIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid first name (too long).", (done) => {
            this.userCreationOptions.form.firstName = "JonathanOfClanShepardOfTheCitadel";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().firstNameLengthIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid last name (non-alpha).", (done) => {
            this.userCreationOptions.form.lastName = "Shep@rd";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().lastNameIsNotAlphabetic);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid last name (too short).", (done) => {
            this.userCreationOptions.form.lastName = "S";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().lastNameLengthIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with an invalid last name (too long).", (done) => {
            this.userCreationOptions.form.lastName = "ShepardWhoLikesToPickFavorites";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().lastNameLengthIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canEnterMealCount).", (done) => {
            this.userCreationOptions.form.canEnterMealCount = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canEnterMealCountIsNotBoolean);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canChangeProps).", (done) => {
            this.userCreationOptions.form.canChangeProps = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canChangePropsIsNotBoolean);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canCreateNewsItems).", (done) => {
            this.userCreationOptions.form.canCreateNewsItems = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canCreateNewsItemsIsNotBoolean);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canEditNewsItems).", (done) => {
            this.userCreationOptions.form.canEditNewsItems = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canEditNewsItemsIsNotBoolean);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canDeleteNewsItems).", (done) => {
            this.userCreationOptions.form.canDeleteNewsItems = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canDeleteNewsItemsIsNotBoolean);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canCreateNewsItemComments).", (done) => {
            this.userCreationOptions.form.canCreateNewsItemComments = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canCreateNewsItemCommentsIsNotBoolean);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canEditNewsItemComments).", (done) => {
            this.userCreationOptions.form.canEditNewsItemComments = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canEditNewsItemCommentsIsNotBoolean);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canDeleteNewsItemComments).", (done) => {
            this.userCreationOptions.form.canDeleteNewsItemComments = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canDeleteNewsItemCommentsIsNotBoolean);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a User object with invalid authorization flag value (canChangeRoles).", (done) => {
            this.userCreationOptions.form.canChangeRoles = "sqlInjection";
            request.post(this.userCreationOptions,
                (err, res, body) => {
                    User.findOne({ where: { email: this.userCreationOptions.form.email } })
                        .then((user) => {
                            expect(user).toBeNull();
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserCreationErrorMessages().canChangeRolesIsNotBoolean);
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

    describe("POST /users/sign_in", () => {
        beforeEach((done) => {
            this.userSignInOptions = {
                url: `${base}sign_in`,
                form: {
                    email: "shepard@n7.gov",
                    password: "M1nerals21"
                }
            };
            const salt = bcrypt.genSaltSync();
            const userCreationBeforeSignInOptions = {
                email: this.userSignInOptions.form.email,
                password: bcrypt.hashSync(this.userSignInOptions.form.password, salt),
                firstName: "John",
                lastName: "Shepard",
                mobilePhone: "5804361776"
            };
            User.create(userCreationBeforeSignInOptions)
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    fail("Error creating first user for sign-in specs in User integration test.");
                    done();
                });
        });
        it("Should return the associated User object when the correct email and password are supplied.", (done) => {
            request.post(this.userSignInOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).user.email).toBe(this.userSignInOptions.form.email);
                    done();
                }
            );
        });
        it("Should return the appropriate error when an incorrect password is supplied.", (done) => {
            this.userSignInOptions.form.password = "M1nerals23";
            request.post(this.userSignInOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserSignInErrorMessages().passwordIsIncorrect);
                    done();
                }
            );
        });
        it("Should return the appropriate error when an unregistered email is supplied.", (done) => {
            this.userSignInOptions.form.email = "shepard@n7.edu";
            request.post(this.userSignInOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getUserSignInErrorMessages().emailIsNotRegistered);
                    done();
                }
            );
        });
    });
});
