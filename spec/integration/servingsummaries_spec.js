const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/servingSummaries/";

const sequelize = require("../../src/db/models/index").sequelize;
const ServingSummary = require("../../src/db/models").ServingSummary;
const User = require("../../src/db/models").User;

const servingSummaryFactory = require("../../src/support/factories/servingSummaryFactory");
const userFactory = require("../../src/support/factories/userFactory");
const errorMessages = require("../../src/support/dictionaries/errorMessages");

describe("routes : servingSummaries", () => {
    beforeEach((done) => {
        this.newServingSummary = servingSummaryFactory.get();
        this.newUser = userFactory.get();
        this.newServingSummary.whichUserCreated = this.newUser.email;
        sequelize.sync({ force: true })
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    describe("POST /servingSummaries", () => {
        beforeEach((done) => {
            this.servingSummaryCreationOptions = {
                url: base,
                form: this.newServingSummary
            };
            this.newUser.canEnterMealCount = true;
            User.create(this.newUser)
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            done();
        });
        it("Should create a ServingSummary object with valid values and return it.", (done) => {
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findOne({ where: {
                        year: this.servingSummaryCreationOptions.form.year,
                        month: this.servingSummaryCreationOptions.form.month,
                        day: this.servingSummaryCreationOptions.form.day
                    } })
                        .then((servingSummary) => {
                            expect(servingSummary).not.toBeNull();
                            expect(servingSummary.id).toBe(1);
                            expect(servingSummary.year).toBe(this.servingSummaryCreationOptions.form.year);
                            expect(servingSummary.month).toBe(this.servingSummaryCreationOptions.form.month);
                            expect(servingSummary.day).toBe(this.servingSummaryCreationOptions.form.day);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with a duplicate date.", (done) => {
            ServingSummary.create(this.servingSummaryCreationOptions.form)
                .then((servingSummary) => {
                    request.post(this.servingSummaryCreationOptions,
                        (err, res, body) => {
                            ServingSummary.findAll({ where: {
                                year: this.servingSummaryCreationOptions.form.year,
                                month: this.servingSummaryCreationOptions.form.month,
                                day: this.servingSummaryCreationOptions.form.day
                            } })
                                .then((servingSummaries) => {
                                    expect(servingSummaries.length).toEqual(1);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().dateIsNotUnique);
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
                    fail("Error creating first servingSummary for duplicate date creation failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not create a ServingSummary object if the supplied user email is invalid.", (done) => {
            this.servingSummaryCreationOptions.form.whichUserCreated = "ShepardAtn7Dotgov";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().whichUserCreatedEmailIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with an invalid year value.", (done) => {
            this.servingSummaryCreationOptions.form.year = "sqlInjection";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().yearIsNotNumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with an invalid month value.", (done) => {
            this.servingSummaryCreationOptions.form.month = "sqlInjection";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().monthIsNotNumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with an invalid day value.", (done) => {
            this.servingSummaryCreationOptions.form.day = "sqlInjection";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().dayIsNotNumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with an invalid total meals value.", (done) => {
            this.servingSummaryCreationOptions.form.totalMeals = "sqlInjection";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().totalMealsIsNotNumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with an invalid adult guest meals value.", (done) => {
            this.servingSummaryCreationOptions.form.adultGuestMeals = "sqlInjection";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().adultGuestMealsIsNotNumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with an invalid child guest meals value.", (done) => {
            this.servingSummaryCreationOptions.form.childGuestMeals = "sqlInjection";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().childGuestMealsIsNotNumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with an invalid volunteer meals value.", (done) => {
            this.servingSummaryCreationOptions.form.volunteerMeals = "sqlInjection";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().volunteerMealsIsNotNumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should return the appropriate error when an unregistered user email is supplied.", (done) => {
            this.servingSummaryCreationOptions.form.whichUserCreated = "gwyndolin@anor.gov";
            this.servingSummaryCreationOptions.form.whichUserLastChanged = "gwyndolin@anor.gov";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().userDoesNotExist);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should return the appropriate error when a user email is supplied who doesn't have meal entering privileges.", (done) => {
            this.newUser.email = "gwyndolin@anor.gov";
            this.newUser.canEnterMealCount = false;
            this.servingSummaryCreationOptions.form.whichUserCreated = "gwyndolin@anor.gov";
            User.create(this.newUser)
                .then((user) => {
                    request.post(this.servingSummaryCreationOptions,
                        (err, res, body) => {
                            ServingSummary.findAll()
                                .then((servingSummaries) => {
                                    expect(servingSummaries.length).toBe(0);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().userCannotEnterMealCounts);
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
                    fail("Error creating user for insufficient privileges creation failure spec in ServingSummary integration test.");
                });
        });
        it("Should not create a ServingSummary object with an invalid creating user value.", (done) => {
            this.servingSummaryCreationOptions.form.whichUserCreated = "ShepardAtn7Dotgov";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().whichUserCreatedEmailIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a ServingSummary object with an invalid last changing user value.", (done) => {
            this.servingSummaryCreationOptions.form.whichUserLastChanged = "ShepardAtn7Dotgov";
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findAll()
                        .then((servingSummaries) => {
                            expect(servingSummaries.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().whichUserLastChangedEmailIsInvalid);
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

    describe("GET /servingSummaries/year/:year/month/:month/day/:day", () => {
        beforeEach((done) => {
            ServingSummary.create(this.newServingSummary)
                .then((servingSummary) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should return the associated ServingSummary object when the correct date is supplied.", (done) => {
            request.get(`${ base }year/${ this.newServingSummary.year }/month/${ this.newServingSummary.month }/day/${ this.newServingSummary.day }`,
                (err, res, body) => {
                    expect(JSON.parse(body).servingSummary.totalMeals).toEqual(this.newServingSummary.totalMeals);
                    done();
                }
            );
        });
        it("Should return the appropriate error when a nonexistent date is supplied.", (done) => {
            request.get(`${ base }year/${ this.newServingSummary.year }/month/${ this.newServingSummary.month }/day/${ this.newServingSummary.day+1 }`,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryUpdateErrorMessages().dateDoesNotExist);
                    done();
                }
            );
        });
    });

    describe("PATCH /servingSummaries/year/:year/month/:month/day/:day", () => {
        beforeEach((done) => {
            this.servingSummaryUpdateUser = userFactory.get();
            this.servingSummaryUpdateUser.canEnterMealCount = true;
            ServingSummary.create(this.newServingSummary)
                .then((servingSummary) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            this.servingSummaryUpdateOptions = {
                url: `${ base }year/${ this.newServingSummary.year }/month/${ this.newServingSummary.month }/day/${ this.newServingSummary.day }`,
                form: {
                    whichUserLastChanged: this.servingSummaryUpdateUser.email,
                    updatedServingSummary: {
                        notes: "Supervisor defeated by the Chosen Undead."
                    }
                }
            };
        });
        it("Should return the updated ServingSummary object when the update endpoint is provided with acceptable field values.", (done) => {
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            expect(JSON.parse(body).servingSummary.notes).toEqual(this.servingSummaryUpdateOptions.form.updatedServingSummary.notes);
                            done();
                        }
                    );
                })
                .catch((err) => {
                    fail("Error creating user for update success spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should return the appropriate error when a nonexistent date is supplied.", (done) => {
            this.servingSummaryUpdateOptions.url = `${ base }year/${ this.newServingSummary.year }/month/${ this.newServingSummary.month }/day/${ this.newServingSummary.day+1 }`;
            request.patch(this.servingSummaryUpdateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryUpdateErrorMessages().dateDoesNotExist);
                    done();
                }
            );
        });
        it("Should not update a ServingSummary object with an invalid year value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.year = "sqlInjection";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                year: this.newServingSummary.year,
                                month: this.newServingSummary.month,
                                day: this.newServingSummary.day
                            } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().yearIsNotNumeric);
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
                    fail("Error creating user for invalid year update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not update a ServingSummary object with an invalid month value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.month = "sqlInjection";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                year: this.newServingSummary.year,
                                month: this.newServingSummary.month,
                                day: this.newServingSummary.day
                            } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().monthIsNotNumeric);
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
                    fail("Error creating user for invalid month update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not update a ServingSummary object with an invalid day value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.day = "sqlInjection";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                year: this.newServingSummary.year,
                                month: this.newServingSummary.month,
                                day: this.newServingSummary.day
                            } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().dayIsNotNumeric);
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
                    fail("Error creating user for invalid day update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not update a ServingSummary object with an invalid total meals value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.totalMeals = "sqlInjection";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                year: this.newServingSummary.year,
                                month: this.newServingSummary.month,
                                day: this.newServingSummary.day
                            } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().totalMealsIsNotNumeric);
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
                    fail("Error creating user for invalid total meals update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not update a ServingSummary object with an invalid adult guest meals value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.adultGuestMeals = "sqlInjection";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                year: this.newServingSummary.year,
                                month: this.newServingSummary.month,
                                day: this.newServingSummary.day
                            } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().adultGuestMealsIsNotNumeric);
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
                    fail("Error creating user for invalid adult guest meals update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not update a ServingSummary object with an invalid child guest meals value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.childGuestMeals = "sqlInjection";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                year: this.newServingSummary.year,
                                month: this.newServingSummary.month,
                                day: this.newServingSummary.day
                            } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().childGuestMealsIsNotNumeric);
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
                    fail("Error creating user for invalid child guest meals update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not update a ServingSummary object with an invalid volunteer meals value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.volunteerMeals = "sqlInjection";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                year: this.newServingSummary.year,
                                month: this.newServingSummary.month,
                                day: this.newServingSummary.day
                            } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().volunteerMealsIsNotNumeric);
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
                    fail("Error creating user for invalid volunteer meals update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not update a ServingSummary object with an invalid creating user value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.whichUserCreated = "ShepardAtn7Dotgov";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                    year: this.newServingSummary.year,
                                    month: this.newServingSummary.month,
                                    day: this.newServingSummary.day
                                } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().whichUserCreatedEmailIsInvalid);
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
                    fail("Error creating user for invalid creating user email update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should not update a ServingSummary object with an invalid last changing user value.", (done) => {
            this.servingSummaryUpdateOptions.form.updatedServingSummary.whichUserLastChanged = "ShepardAtn7Dotgov";
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            ServingSummary.findOne({ where: {
                                    year: this.newServingSummary.year,
                                    month: this.newServingSummary.month,
                                    day: this.newServingSummary.day
                                } })
                                .then((servingSummary) => {
                                    expect(servingSummary.notes).toEqual(this.newServingSummary.notes);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().whichUserLastChangedEmailIsInvalid);
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
                    fail("Error creating user for invalid last changing user email update failure spec in ServingSummary integration test.");
                    done();
                });
        });
        it("Should return the appropriate error when an invalid user email is supplied.", (done) => {
            this.servingSummaryUpdateOptions.form.whichUserLastChanged = "ShepardAtn7Dotgov";
            request.patch(this.servingSummaryUpdateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryCreationErrorMessages().whichUserLastChangedEmailIsInvalid);
                    done();
                }
            );
        });
        it("Should return the appropriate error when an unregistered user email is supplied.", (done) => {
            request.patch(this.servingSummaryUpdateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryUpdateErrorMessages().userDoesNotExist);
                    done();
                }
            );
        });
        it("Should return the appropriate error when a user email is supplied who doesn't have meal entering privileges.", (done) => {
            this.servingSummaryUpdateUser.canEnterMealCount = false;
            User.create(this.servingSummaryUpdateUser)
                .then((user) => {
                    request.patch(this.servingSummaryUpdateOptions,
                        (err, res, body) => {
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getServingSummaryUpdateErrorMessages().userCannotEnterMealCounts);
                            done();
                        }
                    );
                })
                .catch((err) => {
                    fail("Error creating user for insufficient privileges update failure spec in ServingSummary integration test.");
                    done();
                });
        });
    });

    describe("GET /servingSummaries/year/:year/month/:month", () => {
        beforeEach((done) => {
            this.firstServingSummary = servingSummaryFactory.getDetailed(2020, 1, 1, 45, 30, 10, 5);
            this.secondServingSummary = servingSummaryFactory.getDetailed(2020, 1, 2, 60, 45, 10, 5);
            this.thirdServingSummary = servingSummaryFactory.getDetailed(2020, 2, 1, 75, 60, 10, 5);
            ServingSummary.bulkCreate([ this.firstServingSummary, this.secondServingSummary, this.thirdServingSummary ])
                .then((servingSummaries) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            this.servingSummaryAggregateOptions = {
                url: `${ base }year/${ this.firstServingSummary.year }/month/${ this.firstServingSummary.month }`
            };
        });
        it("Should return the appropriate totals when a year and month are supplied for which there are numbers.", (done) => {
            request.get(this.servingSummaryAggregateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).monthSummary.totalMeals).toBe(this.firstServingSummary.totalMeals + this.secondServingSummary.totalMeals);
                    expect(JSON.parse(body).monthSummary.adultGuestMeals).toBe(this.firstServingSummary.adultGuestMeals + this.secondServingSummary.adultGuestMeals);
                    expect(JSON.parse(body).monthSummary.childGuestMeals).toBe(this.firstServingSummary.childGuestMeals + this.secondServingSummary.childGuestMeals);
                    expect(JSON.parse(body).monthSummary.volunteerMeals).toBe(this.firstServingSummary.volunteerMeals + this.secondServingSummary.volunteerMeals);
                    done();
                });
        });
        it("Should return the appropriate totals when a year and month are supplied for which there aren't numbers.", (done) => {
            this.servingSummaryAggregateOptions.url = `${ base }year/${ this.firstServingSummary.year + 3 }/month/${ this.firstServingSummary.month + 3 }`;
            request.get(this.servingSummaryAggregateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).monthSummary.totalMeals).toBe(0);
                    expect(JSON.parse(body).monthSummary.adultGuestMeals).toBe(0);
                    expect(JSON.parse(body).monthSummary.childGuestMeals).toBe(0);
                    expect(JSON.parse(body).monthSummary.volunteerMeals).toBe(0);
                    done();
                });
        });
    });

    describe("GET /servingSummaries/year/:year", () => {
        beforeEach((done) => {
            this.firstServingSummary = servingSummaryFactory.getDetailed(2020, 1, 1, 45, 30, 10, 5);
            this.secondServingSummary = servingSummaryFactory.getDetailed(2020, 1, 2, 60, 45, 10, 5);
            this.thirdServingSummary = servingSummaryFactory.getDetailed(2021, 1, 3, 75, 60, 10, 5);
            ServingSummary.bulkCreate([ this.firstServingSummary, this.secondServingSummary, this.thirdServingSummary ])
                .then((servingSummaries) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            this.servingSummaryAggregateOptions = {
                url: `${ base }year/${ this.firstServingSummary.year }`
            };
        });
        it("Should return the appropriate totals when a year is supplied for which there are numbers.", (done) => {
            request.get(this.servingSummaryAggregateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).yearSummary.totalMeals).toBe(this.firstServingSummary.totalMeals + this.secondServingSummary.totalMeals);
                    expect(JSON.parse(body).yearSummary.adultGuestMeals).toBe(this.firstServingSummary.adultGuestMeals + this.secondServingSummary.adultGuestMeals);
                    expect(JSON.parse(body).yearSummary.childGuestMeals).toBe(this.firstServingSummary.childGuestMeals + this.secondServingSummary.childGuestMeals);
                    expect(JSON.parse(body).yearSummary.volunteerMeals).toBe(this.firstServingSummary.volunteerMeals + this.secondServingSummary.volunteerMeals);
                    done();
                });
        });
        it("Should return the appropriate totals when a year is supplied for which there aren't numbers.", (done) => {
            this.servingSummaryAggregateOptions.url = `${ base }year/${ this.firstServingSummary.year + 3 }`;
            request.get(this.servingSummaryAggregateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).yearSummary.totalMeals).toBe(0);
                    expect(JSON.parse(body).yearSummary.adultGuestMeals).toBe(0);
                    expect(JSON.parse(body).yearSummary.childGuestMeals).toBe(0);
                    expect(JSON.parse(body).yearSummary.volunteerMeals).toBe(0);
                    done();
                });
        });
    });
});
