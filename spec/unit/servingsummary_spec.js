const sequelize = require("../../src/db/models/index").sequelize;
const ServingSummary = require("../../src/db/models").ServingSummary;

const errorMessages = require("../../src/support/dictionaries/errorMessages").getServingSummaryCreationErrorMessages();

describe("ServingSummary", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    describe("#create()", () => {
        beforeEach((done) => {
            this.servingSummaryCreationOptions = {
                year: 2020,
                month: 1,
                day: 1,
                totalMeals: 50,
                adultGuestMeals: 20,
                childGuestMeals: 20,
                volunteerMeals: 10,
                whichUserCreated: "artorias@anor.gov",
                whichUserLastChanged: "ggwsif@anor.gov",
                notes: "Supervisor fell to Abyss.",
                hadIncident: true
            };
            done();
        });
        it("Should create a ServingSummary object with valid values.", (done) => {
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    expect(servingSummary.id).toBe(1);
                    expect(servingSummary.year).toBe(this.servingSummaryCreationOptions.year);
                    expect(servingSummary.month).toBe(this.servingSummaryCreationOptions.month);
                    expect(servingSummary.day).toBe(this.servingSummaryCreationOptions.day);
                    expect(servingSummary.totalMeals).toBe(this.servingSummaryCreationOptions.totalMeals);
                    expect(servingSummary.adultGuestMeals).toBe(this.servingSummaryCreationOptions.adultGuestMeals);
                    expect(servingSummary.childGuestMeals).toBe(this.servingSummaryCreationOptions.childGuestMeals);
                    expect(servingSummary.volunteerMeals).toBe(this.servingSummaryCreationOptions.volunteerMeals);
                    expect(servingSummary.whichUserCreated).toBe(this.servingSummaryCreationOptions.whichUserCreated);
                    expect(servingSummary.whichUserLastChanged).toBe(this.servingSummaryCreationOptions.whichUserLastChanged);
                    expect(servingSummary.notes).toBe(this.servingSummaryCreationOptions.notes);
                    expect(servingSummary.hadIncident).toBe(this.servingSummaryCreationOptions.hadIncident);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null year.", (done) => {
            this.servingSummaryCreationOptions.year = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null year.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.year cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with an invalid year.", (done) => {
            this.servingSummaryCreationOptions.year = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: invalid year.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.yearIsNotNumeric);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null month.", (done) => {
            this.servingSummaryCreationOptions.month = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null month.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.month cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with an invalid month.", (done) => {
            this.servingSummaryCreationOptions.month = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: invalid month.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.monthIsNotNumeric);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null day.", (done) => {
            this.servingSummaryCreationOptions.day = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null day.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.day cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with an invalid day.", (done) => {
            this.servingSummaryCreationOptions.day = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: invalid day.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.dayIsNotNumeric);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null total meal count.", (done) => {
            this.servingSummaryCreationOptions.totalMeals = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null total meal count.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.totalMeals cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with an invalid total meal count.", (done) => {
            this.servingSummaryCreationOptions.totalMeals = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: invalid total meal count.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.totalMealsIsNotNumeric);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null adult guest meal count.", (done) => {
            this.servingSummaryCreationOptions.adultGuestMeals = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null adult guest meal count.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.adultGuestMeals cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with an invalid adult guest meal count.", (done) => {
            this.servingSummaryCreationOptions.adultGuestMeals = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: invalid adult guest meal count.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.adultGuestMealsIsNotNumeric);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null child guest meal count.", (done) => {
            this.servingSummaryCreationOptions.childGuestMeals = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null child guest meal count.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.childGuestMeals cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with an invalid child guest meal count.", (done) => {
            this.servingSummaryCreationOptions.childGuestMeals = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: invalid child guest meal count.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.childGuestMealsIsNotNumeric);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null volunteer meal count.", (done) => {
            this.servingSummaryCreationOptions.volunteerMeals = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null volunteer meal count.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.volunteerMeals cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with an invalid volunteer meal count.", (done) => {
            this.servingSummaryCreationOptions.volunteerMeals = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: invalid volunteer meal count.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.volunteerMealsIsNotNumeric);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null creating user value.", (done) => {
            this.servingSummaryCreationOptions.whichUserCreated = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null creating user value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("ServingSummary.whichUserCreated cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null last changing user value.", (done) => {
            this.servingSummaryCreationOptions.whichUserLastChanged = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null last changing user value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("ServingSummary.whichUserLastChanged cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null incident flag value.", (done) => {
            this.servingSummaryCreationOptions.hadIncident = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: null incident flag value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("ServingSummary.hadIncident cannot be null");
                    done();
                });
        });
        it("Should not create a ServingSummary object with an invalid incident flag value.", (done) => {
            this.servingSummaryCreationOptions.hadIncident = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingSummary) => {
                    fail("Validation failed to catch: invalid incident flag value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain(errorMessages.hadIncidentIsNotBoolean);
                    done();
                });
        });
    });
});
