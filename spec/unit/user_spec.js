const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

const errorMessages = require("../../src/support/dictionaries/errorMessages").getUserCreationErrorMessages();

describe("User", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
    });

    describe("#create()", () => {
        beforeEach((done) => {
            this.userCreationOptions = {
                id: 1,
                email: "Shepard@n7.gov",
                password: "M1nerals21",
                firstName: "John",
                lastName: "Shepard",
                mobilePhone: "5804361776"
            };
            done();
        });
        it("Should create a User object with valid values.", (done) => {
            User.create(this.userCreationOptions)
                .then((user) => {
                    expect(user.id).toBe(1);
                    expect(user.email).toBe(this.userCreationOptions.email);
                    expect(user.password).toBe(this.userCreationOptions.password);
                    expect(user.firstName).toBe(this.userCreationOptions.firstName);
                    expect(user.lastName).toBe(this.userCreationOptions.lastName);
                    expect(user.mobilePhone).toBe(this.userCreationOptions.mobilePhone);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should create a User object with correctly defaulted authorization flags when no values are provided.", (done) => {
            User.create(this.userCreationOptions)
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
        });
        it("Should not create a User object with a duplicate email.", (done) => {
            User.create(this.userCreationOptions)
                .then((user) => {
                    User.create({
                        email: user.email,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        mobilePhone: user.mobilePhone
                    })
                        .then((user) => {
                            fail("Validation failed to catch: duplicate email.");
                            done();
                        })
                        .catch((err) => {
                            expect(err.message).toContain("Validation error");
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        it("Should not create a User object with a null email.", (done) => {
            this.userCreationOptions.email = null;
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: null email.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("User.email cannot be null");
                    done();
                });
        });
        it("Should not create a User object with an invalid email.", (done) => {
            this.userCreationOptions.email = "ShepardAtn7Dotgov";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid email.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.emailIsInvalid);
                    done();
                });
        });
        it("Should not create a User object with a null password.", (done) => {
            this.userCreationOptions.password = null;
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: null password.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("User.password cannot be null");
                    done();
                });
        });
        it("Should not create a User object with a null first name.", (done) => {
            this.userCreationOptions.firstName = null;
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: null first name.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("User.firstName cannot be null");
                    done();
                });
        });
        it("Should not create a User object with an invalid first name.", (done) => {
            this.userCreationOptions.firstName = "J0hn";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid first name.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.firstNameIsNotAlphabetic);
                    done();
                });
        });
        it("Should not create a User object with a first name of invalid length.", (done) => {
            this.userCreationOptions.firstName = "J";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid first name length.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.firstNameLengthIsInvalid);
                    done();
                });
        });
        it("Should not create a User object with a null last name.", (done) => {
            this.userCreationOptions.lastName = null;
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: null last name.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("User.lastName cannot be null");
                    done();
                });
        });
        it("Should not create a User object with an invalid last name.", (done) => {
            this.userCreationOptions.lastName = "Shep@rd";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid last name.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.lastNameIsNotAlphabetic);
                    done();
                });
        });
        it("Should not create a User object with a last name of invalid length.", (done) => {
            this.userCreationOptions.lastName = "S";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid last name length.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.lastNameLengthIsInvalid);
                    done();
                });
        });
        it("Should not create a User object with a null mobile phone.", (done) => {
            this.userCreationOptions.mobilePhone = null;
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: null mobile phone.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("User.mobilePhone cannot be null");
                    done();
                });
        });
        it("Should not create a User object with an invalid mobile phone.", (done) => {
            this.userCreationOptions.mobilePhone = "myb@dph0ne";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid mobile phone.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.mobilePhoneIsNotNumeric);
                    done();
                });
        });
        it("Should not create a User object with a mobile phone of invalid length.", (done) => {
            this.userCreationOptions.mobilePhone = "15804361776";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid mobile phone length.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.mobilePhoneLengthIsInvalid);
                    done();
                });
        });
        it("Should not create a User object with an invalid home phone.", (done) => {
            this.userCreationOptions.homePhone = "myb@dph0ne";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid home phone.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.homePhoneIsNotNumeric);
                    done();
                });
        });
        it("Should not create a User object with a home phone of invalid length.", (done) => {
            this.userCreationOptions.homePhone = "15804361776";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid home phone length.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.homePhoneLengthIsInvalid);
                    done();
                });
        });
        it("Should not create a User object with an invalid work phone.", (done) => {
            this.userCreationOptions.workPhone = "myb@dph0ne";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid work phone.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.workPhoneIsNotNumeric);
                    done();
                });
        });
        it("Should not create a User object with a work phone of invalid length.", (done) => {
            this.userCreationOptions.workPhone = "15804361776";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid work phone length.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.workPhoneLengthIsInvalid);
                    done();
                });
        });
        it("Should not create a User object with an invalid other phone.", (done) => {
            this.userCreationOptions.otherPhone = "myb@dph0ne";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid other phone.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.otherPhoneIsNotNumeric);
                    done();
                });
        });
        it("Should not create a User object with a other phone of invalid length.", (done) => {
            this.userCreationOptions.otherPhone = "15804361776";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid other phone length.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.otherPhoneLengthIsInvalid);
                    done();
                });
        });
        it("Should not create a User object with invalid authorization flag values.", (done) => {
            this.userCreationOptions.canEnterMealCount = "sqlInjection";
            this.userCreationOptions.canChangeProps = "sqlInjection";
            this.userCreationOptions.canCreateNewsItems = "sqlInjection";
            this.userCreationOptions.canEditNewsItems = "sqlInjection";
            this.userCreationOptions.canDeleteNewsItems = "sqlInjection";
            this.userCreationOptions.canCreateNewsItemComments = "sqlInjection";
            this.userCreationOptions.canEditNewsItemComments = "sqlInjection";
            this.userCreationOptions.canDeleteNewsItemComments = "sqlInjection";
            this.userCreationOptions.canChangeRoles = "sqlInjection";
            User.create(this.userCreationOptions)
                .then((user) => {
                    fail("Validation failed to catch: invalid authorization flag values.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors[0].message).toBe(errorMessages.canEnterMealCountIsNotBoolean);
                    expect(err.errors[1].message).toBe(errorMessages.canChangePropsIsNotBoolean);
                    expect(err.errors[2].message).toBe(errorMessages.canCreateNewsItemsIsNotBoolean);
                    expect(err.errors[3].message).toBe(errorMessages.canEditNewsItemsIsNotBoolean);
                    expect(err.errors[4].message).toBe(errorMessages.canDeleteNewsItemsIsNotBoolean);
                    expect(err.errors[5].message).toBe(errorMessages.canCreateNewsItemCommentsIsNotBoolean);
                    expect(err.errors[6].message).toBe(errorMessages.canEditNewsItemCommentsIsNotBoolean);
                    expect(err.errors[7].message).toBe(errorMessages.canDeleteNewsItemCommentsIsNotBoolean);
                    expect(err.errors[8].message).toBe(errorMessages.canChangeRolesIsNotBoolean);
                    done();
                });
        });
    });
});
