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
        // it("Should not create a StaffMember object with a null month.", (done) => {
        //     this.staffMemberCreationOptions.month = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null month.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.month cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid month.", (done) => {
        //     this.staffMemberCreationOptions.month = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid month.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.monthIsNotNumeric);
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with a null day.", (done) => {
        //     this.staffMemberCreationOptions.day = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null day.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.day cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid day.", (done) => {
        //     this.staffMemberCreationOptions.day = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid day.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.dayIsNotNumeric);
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with a null total meal count.", (done) => {
        //     this.staffMemberCreationOptions.totalMeals = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null total meal count.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.totalMeals cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid total meal count.", (done) => {
        //     this.staffMemberCreationOptions.totalMeals = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid total meal count.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.totalMealsIsNotNumeric);
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with a null adult guest meal count.", (done) => {
        //     this.staffMemberCreationOptions.adultGuestMeals = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null adult guest meal count.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.adultGuestMeals cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid adult guest meal count.", (done) => {
        //     this.staffMemberCreationOptions.adultGuestMeals = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid adult guest meal count.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.adultGuestMealsIsNotNumeric);
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with a null child guest meal count.", (done) => {
        //     this.staffMemberCreationOptions.childGuestMeals = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null child guest meal count.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.childGuestMeals cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid child guest meal count.", (done) => {
        //     this.staffMemberCreationOptions.childGuestMeals = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid child guest meal count.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.childGuestMealsIsNotNumeric);
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with a null volunteer meal count.", (done) => {
        //     this.staffMemberCreationOptions.volunteerMeals = null;
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: null volunteer meal count.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain("StaffMember.volunteerMeals cannot be null");
        //             done();
        //         });
        // });
        // it("Should not create a StaffMember object with an invalid volunteer meal count.", (done) => {
        //     this.staffMemberCreationOptions.volunteerMeals = "T3st";
        //     StaffMember.create(this.staffMemberCreationOptions)
        //         .then((staffmember) => {
        //             fail("Validation failed to catch: invalid volunteer meal count.");
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err.errors.length).toEqual(1);
        //             expect(err.errors[0].message).toContain(errorMessages.volunteerMealsIsNotNumeric);
        //             done();
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
