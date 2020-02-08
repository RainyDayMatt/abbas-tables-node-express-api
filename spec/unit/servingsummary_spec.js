const sequelize = require("../../src/db/models/index").sequelize;
const ServingSummary = require("../../src/db/models").ServingSummary;

const validationMessages = require("../../src/support/dictionaries/errorMessages").getServingSummaryValidationMessages();

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
                .then((servingsummary) => {
                    expect(servingsummary.id).toBe(1);
                    expect(servingsummary.year).toBe(this.servingSummaryCreationOptions.year);
                    expect(servingsummary.month).toBe(this.servingSummaryCreationOptions.month);
                    expect(servingsummary.day).toBe(this.servingSummaryCreationOptions.day);
                    expect(servingsummary.totalMeals).toBe(this.servingSummaryCreationOptions.totalMeals);
                    expect(servingsummary.adultGuestMeals).toBe(this.servingSummaryCreationOptions.adultGuestMeals);
                    expect(servingsummary.childGuestMeals).toBe(this.servingSummaryCreationOptions.childGuestMeals);
                    expect(servingsummary.volunteerMeals).toBe(this.servingSummaryCreationOptions.volunteerMeals);
                    expect(servingsummary.whichUserCreated).toBe(this.servingSummaryCreationOptions.whichUserCreated);
                    expect(servingsummary.whichUserLastChanged).toBe(this.servingSummaryCreationOptions.whichUserLastChanged);
                    expect(servingsummary.notes).toBe(this.servingSummaryCreationOptions.notes);
                    expect(servingsummary.hadIncident).toBe(this.servingSummaryCreationOptions.hadIncident);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should not create a ServingSummary object with a null year.", () => {
            this.servingSummaryCreationOptions.year = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: null year.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.year cannot be null");
                });
        });
        it("Should not create a ServingSummary object with an invalid year.", () => {
            this.servingSummaryCreationOptions.year = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: invalid year.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(validationMessages.yearIsNotNumeric);
                });
        });
        it("Should not create a ServingSummary object with a null month.", () => {
            this.servingSummaryCreationOptions.month = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: null month.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.month cannot be null");
                });
        });
        it("Should not create a ServingSummary object with an invalid month.", () => {
            this.servingSummaryCreationOptions.month = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: invalid month.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(validationMessages.monthIsNotNumeric);
                });
        });
        it("Should not create a ServingSummary object with a null day.", () => {
            this.servingSummaryCreationOptions.day = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: null day.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.day cannot be null");
                });
        });
        it("Should not create a ServingSummary object with an invalid day.", () => {
            this.servingSummaryCreationOptions.day = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: invalid day.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(validationMessages.dayIsNotNumeric);
                });
        });
        it("Should not create a ServingSummary object with a null total meal count.", () => {
            this.servingSummaryCreationOptions.totalMeals = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: null total meal count.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.totalMeals cannot be null");
                });
        });
        it("Should not create a ServingSummary object with an invalid total meal count.", () => {
            this.servingSummaryCreationOptions.totalMeals = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: invalid total meal count.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(validationMessages.totalMealsIsNotNumeric);
                });
        });
        it("Should not create a ServingSummary object with a null adult guest meal count.", () => {
            this.servingSummaryCreationOptions.adultGuestMeals = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: null adult guest meal count.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.adultGuestMeals cannot be null");
                });
        });
        it("Should not create a ServingSummary object with an invalid adult guest meal count.", () => {
            this.servingSummaryCreationOptions.adultGuestMeals = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: invalid adult guest meal count.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(validationMessages.adultGuestMealsIsNotNumeric);
                });
        });
        it("Should not create a ServingSummary object with a null child guest meal count.", () => {
            this.servingSummaryCreationOptions.childGuestMeals = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: null child guest meal count.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.childGuestMeals cannot be null");
                });
        });
        it("Should not create a ServingSummary object with an invalid child guest meal count.", () => {
            this.servingSummaryCreationOptions.childGuestMeals = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: invalid child guest meal count.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(validationMessages.childGuestMealsIsNotNumeric);
                });
        });
        it("Should not create a ServingSummary object with a null volunteer meal count.", () => {
            this.servingSummaryCreationOptions.volunteerMeals = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: null volunteer meal count.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("ServingSummary.volunteerMeals cannot be null");
                });
        });
        it("Should not create a ServingSummary object with an invalid volunteer meal count.", () => {
            this.servingSummaryCreationOptions.volunteerMeals = "T3st";
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
                    fail("Validation failed to catch: invalid volunteer meal count.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(validationMessages.volunteerMealsIsNotNumeric);
                });
        });
        it("Should not create a ServingSummary object with a null creating user value.", (done) => {
            this.servingSummaryCreationOptions.whichUserCreated = null;
            ServingSummary.create(this.servingSummaryCreationOptions)
                .then((servingsummary) => {
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
                .then((servingsummary) => {
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
                .then((servingsummary) => {
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
                .then((servingsummary) => {
                    fail("Validation failed to catch: invalid incident flag value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain(validationMessages.hadIncidentIsNotBoolean);
                    done();
                });
        });
    });
});
