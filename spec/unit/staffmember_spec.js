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
                .then((staffMember) => {
                    expect(staffMember.id).toBe(1);
                    expect(staffMember.groupName).toBe(this.staffMemberCreationOptions.groupName);
                    expect(staffMember.orderNumber).toBe(this.staffMemberCreationOptions.orderNumber);
                    expect(staffMember.name).toBe(this.staffMemberCreationOptions.name);
                    expect(staffMember.title).toBe(this.staffMemberCreationOptions.title);
                    expect(staffMember.bio).toBe(this.staffMemberCreationOptions.bio);
                    expect(staffMember.whichUserCreated).toBe(this.staffMemberCreationOptions.whichUserCreated);
                    expect(staffMember.whichUserLastChanged).toBe(this.staffMemberCreationOptions.whichUserLastChanged);
                    done();
                })
                .catch((err) => {
                    fail("StaffMember creation success spec failed: " + err.errors[0].message);
                    done();
                });
        });
        it("Should not create a StaffMember object with a null group name.", (done) => {
            this.staffMemberCreationOptions.groupName = null;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: null group name.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("StaffMember.groupName cannot be null");
                    done();
                });
        });
        it("Should not create a StaffMember object with an invalid group name.", (done) => {
            this.staffMemberCreationOptions.groupName = 225;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: invalid group name.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.groupNameIsNotAlphabeticalWithSpaces);
                    done();
                });
        });
        it("Should not create a StaffMember object with a null order name.", (done) => {
            this.staffMemberCreationOptions.orderNumber = null;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: null order number.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("StaffMember.orderNumber cannot be null");
                    done();
                });
        });
        it("Should not create a StaffMember object with an invalid order number.", (done) => {
            this.staffMemberCreationOptions.orderNumber = "T3st";
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: invalid order number.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.orderNumberIsNotNumeric);
                    done();
                });
        });
        it("Should not create a StaffMember object with a null name.", (done) => {
            this.staffMemberCreationOptions.name = null;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: null name.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("StaffMember.name cannot be null");
                    done();
                });
        });
        it("Should not create a StaffMember object with an invalid name.", (done) => {
            this.staffMemberCreationOptions.name = 225;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: invalid name.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.nameIsNotAlphabeticalWithSpaces);
                    done();
                });
        });
        it("Should not create a StaffMember object with a null title.", (done) => {
            this.staffMemberCreationOptions.title = null;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: null title.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("StaffMember.title cannot be null");
                    done();
                });
        });
        it("Should not create a StaffMember object with an invalid title.", (done) => {
            this.staffMemberCreationOptions.title = "T3st";
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: invalid title.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain(errorMessages.titleIsNotAlphabeticalWithSpaces);
                    done();
                });
        });
        it("Should not create a StaffMember object with a null bio.", (done) => {
            this.staffMemberCreationOptions.bio = null;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: null bio.");
                    done();
                })
                .catch((err) => {
                    expect(err.errors.length).toEqual(1);
                    expect(err.errors[0].message).toContain("StaffMember.bio cannot be null");
                    done();
                });
        });
        it("Should not create a StaffMember object with a null creating user value.", (done) => {
            this.staffMemberCreationOptions.whichUserCreated = null;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: null creating user value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("StaffMember.whichUserCreated cannot be null");
                    done();
                });
        });
        it("Should not create a StaffMember object with a null last changing user value.", (done) => {
            this.staffMemberCreationOptions.whichUserLastChanged = null;
            StaffMember.create(this.staffMemberCreationOptions)
                .then((staffMember) => {
                    fail("Validation failed to catch: null last changing user value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("StaffMember.whichUserLastChanged cannot be null");
                    done();
                });
        });
    });
});
