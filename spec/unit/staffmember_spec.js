const sequelize = require("../../src/db/models/index").sequelize;
const StaffMember = require("../../src/db/models").StaffMember;

const errorMessages = require("../../src/support/dictionaries/errorMessages").getStaffMemberCreationErrorMessages();

describe("StaffMember", () => {
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
            this.staffMemberCreationOptions = {
                groupName: "Andromeda Initiative",
                orderNumber: 1,
                name: "Scott Ryder",
                title: "Human Pathfinder",
                bio: "Lorem ipsum video game reference.",
                whichUserCreated: "sara_ryder@ai.org",
                whichUserLastChanged: "sara_ryder@ai.org"
            };
            done();
        });
        it("Should create a StaffMember object with valid values.", (done) => {
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffmember) => {
                    expect(staffmember.id).toBe(1);
                    expect(staffmember.groupName).toBe(this.staffMemberCreationOptions.groupName);
                    expect(staffmember.orderNumber).toBe(this.staffMemberCreationOptions.orderNumber);
                    expect(staffmember.name).toBe(this.staffMemberCreationOptions.name);
                    expect(staffmember.title).toBe(this.staffMemberCreationOptions.title);
                    expect(staffmember.bio).toBe(this.staffMemberCreationOptions.bio);
                    expect(staffmember.whichUserCreated).toBe(this.staffMemberCreationOptions.whichUserCreated);
                    expect(staffmember.whichUserLastChanged).toBe(this.staffMemberCreationOptions.whichUserLastChanged);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should not create a StaffMember object with a null group name.", () => {
            this.staffMemberCreationOptions.groupName = null;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffmember) => {
                    fail("Validation failed to catch: null group name.")
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("StaffMember.groupName cannot be null");
                });
        });
        it("Should not create a StaffMember object with an invalid group name.", () => {
            this.staffMemberCreationOptions.groupName = false;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffmember) => {
                    console.log("ALPHA");
                    fail("Validation failed to catch: invalid group name.")
                })
                .catch((err) => {
                    console.log("BRAVO");
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.yearIsNotNumeric);
                });
            console.log("CHARLIE");
        });
        // it("Should not create a StaffMember object with a null month.", () => {
        //     this.staffMemberCreationOptions.month = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null month.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.month cannot be null");
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid month.", () => {
        //     this.staffMemberCreationOptions.month = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid month.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.monthIsNotNumeric);
        //         });
        // });
        // it("Should not create a StaffMember object with a null day.", () => {
        //     this.staffMemberCreationOptions.day = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null day.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.day cannot be null");
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid day.", () => {
        //     this.staffMemberCreationOptions.day = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid day.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.dayIsNotNumeric);
        //         });
        // });
        // it("Should not create a StaffMember object with a null total meal count.", () => {
        //     this.staffMemberCreationOptions.totalMeals = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null total meal count.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.totalMeals cannot be null");
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid total meal count.", () => {
        //     this.staffMemberCreationOptions.totalMeals = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid total meal count.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.totalMealsIsNotNumeric);
        //         });
        // });
        // it("Should not create a StaffMember object with a null adult guest meal count.", () => {
        //     this.staffMemberCreationOptions.adultGuestMeals = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null adult guest meal count.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.adultGuestMeals cannot be null");
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid adult guest meal count.", () => {
        //     this.staffMemberCreationOptions.adultGuestMeals = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid adult guest meal count.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.adultGuestMealsIsNotNumeric);
        //         });
        // });
        // it("Should not create a StaffMember object with a null child guest meal count.", () => {
        //     this.staffMemberCreationOptions.childGuestMeals = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null child guest meal count.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.childGuestMeals cannot be null");
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid child guest meal count.", () => {
        //     this.staffMemberCreationOptions.childGuestMeals = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid child guest meal count.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.childGuestMealsIsNotNumeric);
        //         });
        // });
        // it("Should not create a StaffMember object with a null volunteer meal count.", () => {
        //     this.staffMemberCreationOptions.volunteerMeals = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null volunteer meal count.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.volunteerMeals cannot be null");
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid volunteer meal count.", () => {
        //     this.staffMemberCreationOptions.volunteerMeals = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid volunteer meal count.")
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.volunteerMealsIsNotNumeric);
        //         });
        // });
        // it("Should not create a StaffMember object with a null creating user value.", (done) => {
        //     this.staffMemberCreationOptions.whichUserCreated = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null creating user value.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.message).toContain("StaffMember.whichUserCreated cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with a null last changing user value.", (done) => {
        //     this.staffMemberCreationOptions.whichUserLastChanged = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null last changing user value.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.message).toContain("StaffMember.whichUserLastChanged cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with a null incident flag value.", (done) => {
        //     this.staffMemberCreationOptions.hadIncident = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null incident flag value.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.message).toContain("StaffMember.hadIncident cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid incident flag value.", (done) => {
        //     this.staffMemberCreationOptions.hadIncident = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid incident flag value.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.message).toContain(errorMessages.hadIncidentIsNotBoolean);
        //             done();
        //         });
        // });
    });
});
