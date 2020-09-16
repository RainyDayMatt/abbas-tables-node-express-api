const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/staffMembers/";

const sequelize = require("../../src/db/models/index").sequelize;
const StaffMember = require("../../src/db/models").StaffMember;
const User = require("../../src/db/models").User;

const staffMemberFactory = require("../../src/support/factories/staffMemberFactory");
const userFactory = require("../../src/support/factories/userFactory");
const errorMessages = require("../../src/support/dictionaries/errorMessages");

describe("routes : staffMembers", () => {
    beforeEach((done) => {
        this.newStaffMember = staffMemberFactory.get();
        this.newUser = userFactory.get();
        this.newStaffMember.whichUserCreated = this.newUser.email;
        sequelize.sync({ force: true })
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    describe("POST /staffMembers", () => {
        beforeEach((done) => {
            this.staffMemberCreationOptions = {
                url: base,
                form: this.newStaffMember
            };
            this.newUser.canChangeStaffMembers = true;
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
        it("Should create a StaffMember object with valid values and return it.", (done) => {
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findOne({ where: {
                            groupName: this.staffMemberCreationOptions.form.groupName,
                            name: this.staffMemberCreationOptions.form.name
                        } })
                        .then((staffMember) => {
                            expect(staffMember).not.toBeNull();
                            expect(staffMember.id).toBe(1);
                            expect(staffMember.name).toBe(this.staffMemberCreationOptions.form.name);
                            expect(staffMember.groupName).toBe(this.staffMemberCreationOptions.form.groupName);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a StaffMember object with a duplicate group name and name combination.", (done) => {
            StaffMember.create(this.staffMemberCreationOptions.form)
                .then((staffMember) => {
                    request.post(this.staffMemberCreationOptions,
                        (err, res, body) => {
                            StaffMember.findAll({ where: {
                                    groupName: this.staffMemberCreationOptions.form.groupName,
                                    name: this.staffMemberCreationOptions.form.name
                                } })
                                .then((staffMembers) => {
                                    expect(staffMembers.length).toEqual(1);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().groupNameAndNameCombinationIsNotUnique);
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
                    fail("Error creating first staffMember for duplicate group name and name combination creation failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should not create a StaffMember object with an invalid group name value.", (done) => {
            this.staffMemberCreationOptions.form.groupName = 225;
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findAll()
                        .then((staffMembers) => {
                            expect(staffMembers.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().groupNameIsNotAlphabeticalWithSpaces);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a StaffMember object with an invalid order number value.", (done) => {
            this.staffMemberCreationOptions.form.orderNumber = "sqlInjection";
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findAll()
                        .then((staffMembers) => {
                            expect(staffMembers.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().orderNumberIsNotNumeric);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a StaffMember object with an invalid name value.", (done) => {
            this.staffMemberCreationOptions.form.name= 225;
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findAll()
                        .then((staffMembers) => {
                            expect(staffMembers.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().nameIsNotAlphabeticalWithSpaces);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a StaffMember object with an invalid title value.", (done) => {
            this.staffMemberCreationOptions.form.title = 225;
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findAll()
                        .then((staffMembers) => {
                            expect(staffMembers.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().titleIsNotAlphabeticalWithSpaces);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a StaffMember object with an invalid bio value.", (done) => {
            this.staffMemberCreationOptions.form.bio = "sqlInjection#";
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findAll()
                        .then((staffMembers) => {
                            expect(staffMembers.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().bioIsNotAcceptable);
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
            this.staffMemberCreationOptions.form.whichUserCreated = "gwyndolin@anor.gov";
            this.staffMemberCreationOptions.form.whichUserLastChanged = "gwyndolin@anor.gov";
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findAll()
                        .then((staffMembers) => {
                            expect(staffMembers.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().userDoesNotExist);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should return the appropriate error when a user email is supplied who doesn't have staff member editing privileges.", (done) => {
            this.newUser.email = "gwyndolin@anor.gov";
            this.newUser.canChangeStaffMembers = false;
            this.staffMemberCreationOptions.form.whichUserCreated = "gwyndolin@anor.gov";
            User.create(this.newUser)
                .then((user) => {
                    request.post(this.staffMemberCreationOptions,
                        (err, res, body) => {
                            StaffMember.findAll()
                                .then((staffMembers) => {
                                    expect(staffMembers.length).toBe(0);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().userCannotChangeStaffMembers);
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
                    fail("Error creating user for insufficient privileges creation failure spec in StaffMember integration test.");
                });
        });
        it("Should not create a StaffMember object with an invalid creating user value.", (done) => {
            this.staffMemberCreationOptions.form.whichUserCreated = "ShepardAtn7Dotgov";
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findAll()
                        .then((staffMembers) => {
                            expect(staffMembers.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().whichUserCreatedEmailIsInvalid);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        it("Should not create a StaffMember object with an invalid last changing user value.", (done) => {
            this.staffMemberCreationOptions.form.whichUserLastChanged = "ShepardAtn7Dotgov";
            request.post(this.staffMemberCreationOptions,
                (err, res, body) => {
                    StaffMember.findAll()
                        .then((staffMembers) => {
                            expect(staffMembers.length).toBe(0);
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().whichUserLastChangedEmailIsInvalid);
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

    describe("GET /staffMembers/groupName/:groupName/name/:name", () => {
        beforeEach((done) => {
            StaffMember.create(this.newStaffMember)
                .then((staffMember) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should return the associated StaffMember object when the correct group name and name are supplied.", (done) => {
            request.get(`${ base }groupName/${ this.newStaffMember.groupName }/name/${ this.newStaffMember.name }`,
                (err, res, body) => {
                    expect(JSON.parse(body).staffMember.bio).toEqual(this.newStaffMember.bio);
                    done();
                }
            );
        });
        it("Should return the appropriate error when a nonexistent group name and name are supplied.", (done) => {
            request.get(`${ base }groupName/${ this.newStaffMember.groupName }/name/Warren Creo`,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberUpdateErrorMessages().groupNameAndNameCombinationDoesNotExist);
                    done();
                }
            );
        });
    });

    describe("GET /staffMembers/groupName/:groupName", () => {
        beforeEach((done) => {
            this.groupName = "Vault Hunters";
            this.groupMembers = [
                staffMemberFactory.get(),
                staffMemberFactory.get(),
                staffMemberFactory.get()
            ];
            this.groupMembers.forEach((item) => {
                item.groupName = this.groupName;
            });
            StaffMember.bulkCreate(this.groupMembers)
                .then((staffMembers) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should return the associated StaffMember objects when the correct group name is supplied.", (done) => {
            request.get(`${ base }groupName/${ this.groupName }`,
                (err, res, body) => {
                    this.groupIndex = 0;
                    this.groupMembers.forEach((item) => {
                        expect(JSON.parse(body).staffMembers[this.groupIndex].bio).toBe(item.bio);
                        this.groupIndex += 1;
                    });
                    done();
                }
            );
        });
        it("Should return the appropriate error when a nonexistent group name is supplied.", (done) => {
            request.get(`${ base }groupName/sirens`,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberGroupFetchErrorMessages().groupNameDoesNotExist);
                    done();
                }
            );
        });
    });

    describe("PATCH /staffMembers/year/:year/month/:month/day/:day", () => {
        beforeEach((done) => {
            this.staffMemberUpdateUser = userFactory.get();
            this.staffMemberUpdateUser.canChangeStaffMembers = true;
            StaffMember.create(this.newStaffMember)
                .then((staffMember) => {
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            this.staffMemberUpdateOptions = {
                url: `${ base }groupName/${ this.newStaffMember.groupName }/name/${ this.newStaffMember.name }`,
                form: {
                    bio: "Cured of paralysis.",
                    whichUserLastChanged: this.staffMemberUpdateUser.email
                }
            };
        });
        it("Should return the updated StaffMember object when the update endpoint is provided with acceptable field values.", (done) => {
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            expect(JSON.parse(body).staffMember.bio).toEqual(this.staffMemberUpdateOptions.form.bio);
                            done();
                        }
                    );
                })
                .catch((err) => {
                    fail("Error creating user for update success spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should return the appropriate error when a nonexistent group name and name are supplied.", (done) => {
            this.staffMemberUpdateOptions.url = `${ base }groupName/${ this.newStaffMember.groupName }/name/Warren Creo`;
            request.patch(this.staffMemberUpdateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberUpdateErrorMessages().groupNameAndNameCombinationDoesNotExist);
                    done();
                }
            );
        });
        it("Should not update a StaffMember object with an invalid group name value.", (done) => {
            this.staffMemberUpdateOptions.form.groupName = 123;
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            StaffMember.findOne({ where: {
                                    groupName: this.newStaffMember.groupName,
                                    name: this.newStaffMember.name
                                } })
                                .then((staffMember) => {
                                    expect(staffMember.bio).not.toBe(undefined);
                                    expect(staffMember.bio).toEqual(this.newStaffMember.bio);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().groupNameIsNotAlphabeticalWithSpaces);
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
                    fail("Error creating user for invalid group name update failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should not update a StaffMember object with an invalid order number value.", (done) => {
            this.staffMemberUpdateOptions.form.orderNumber = "sqlInjection";
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            StaffMember.findOne({ where: {
                                    groupName: this.newStaffMember.groupName,
                                    name: this.newStaffMember.name
                                } })
                                .then((staffMember) => {
                                    expect(staffMember.bio).not.toBe(undefined);
                                    expect(staffMember.bio).toEqual(this.newStaffMember.bio);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().orderNumberIsNotNumeric);
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
                    fail("Error creating user for invalid order number update failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should not update a StaffMember object with an invalid name value.", (done) => {
            this.staffMemberUpdateOptions.form.name = 123;
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            StaffMember.findOne({ where: {
                                    groupName: this.newStaffMember.groupName,
                                    name: this.newStaffMember.name
                                } })
                                .then((staffMember) => {
                                    expect(staffMember.bio).not.toBe(undefined);
                                    expect(staffMember.bio).toEqual(this.newStaffMember.bio);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().nameIsNotAlphabeticalWithSpaces);
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
                    fail("Error creating user for invalid name update failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should not update a StaffMember object with an invalid title value.", (done) => {
            this.staffMemberUpdateOptions.form.title = 123;
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            StaffMember.findOne({ where: {
                                    groupName: this.newStaffMember.groupName,
                                    name: this.newStaffMember.name
                                } })
                                .then((staffMember) => {
                                    expect(staffMember.bio).not.toBe(undefined);
                                    expect(staffMember.bio).toEqual(this.newStaffMember.bio);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().titleIsNotAlphabeticalWithSpaces);
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
                    fail("Error creating user for invalid title update failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should not update a StaffMember object with an invalid title value.", (done) => {
            this.staffMemberUpdateOptions.form.title = 123;
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            StaffMember.findOne({ where: {
                                    groupName: this.newStaffMember.groupName,
                                    name: this.newStaffMember.name
                                } })
                                .then((staffMember) => {
                                    expect(staffMember.bio).not.toBe(undefined);
                                    expect(staffMember.bio).toEqual(this.newStaffMember.bio);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().titleIsNotAlphabeticalWithSpaces);
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
                    fail("Error creating user for invalid title update failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should not update a StaffMember object with an invalid bio value.", (done) => {
            this.staffMemberUpdateOptions.form.bio = 123;
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            StaffMember.findOne({ where: {
                                    groupName: this.newStaffMember.groupName,
                                    name: this.newStaffMember.name
                                } })
                                .then((staffMember) => {
                                    expect(staffMember.bio).not.toBe(undefined);
                                    expect(staffMember.bio).toEqual(this.newStaffMember.bio);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().bioIsNotAcceptable);
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
                    fail("Error creating user for invalid bio update failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should not update a StaffMember object with an invalid creating user value.", (done) => {
            this.staffMemberUpdateOptions.form.whichUserCreated = "ShepardAtn7Dotgov";
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            StaffMember.findOne({ where: {
                                    groupName: this.newStaffMember.groupName,
                                    name: this.newStaffMember.name
                                } })
                                .then((staffMember) => {
                                    expect(staffMember.bio).not.toBe(undefined);
                                    expect(staffMember.bio).toEqual(this.newStaffMember.bio);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().whichUserCreatedEmailIsInvalid);
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
                    fail("Error creating user for invalid creating user email update failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should not update a StaffMember object with an invalid last changing user value.", (done) => {
            this.staffMemberUpdateOptions.form.whichUserLastChanged = "ShepardAtn7Dotgov";
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            StaffMember.findOne({ where: {
                                    groupName: this.newStaffMember.groupName,
                                    name: this.newStaffMember.name
                                } })
                                .then((staffMember) => {
                                    expect(staffMember.bio).not.toBe(undefined);
                                    expect(staffMember.bio).toEqual(this.newStaffMember.bio);
                                    expect(JSON.parse(body).err.length).toBe(1);
                                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().whichUserLastChangedEmailIsInvalid);
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
                    fail("Error creating user for invalid last changing user email update failure spec in StaffMember integration test.");
                    done();
                });
        });
        it("Should return the appropriate error when an unregistered user email is supplied.", (done) => {
            request.patch(this.staffMemberUpdateOptions,
                (err, res, body) => {
                    expect(JSON.parse(body).err.length).toBe(1);
                    expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberUpdateErrorMessages().userDoesNotExist);
                    done();
                }
            );
        });
        it("Should return the appropriate error when a user email is supplied who doesn't have staff member editing privileges.", (done) => {
            this.staffMemberUpdateUser.canChangeStaffMembers = false;
            User.create(this.staffMemberUpdateUser)
                .then((user) => {
                    request.patch(this.staffMemberUpdateOptions,
                        (err, res, body) => {
                            expect(JSON.parse(body).err.length).toBe(1);
                            expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberUpdateErrorMessages().userCannotChangeStaffMembers);
                            done();
                        }
                    );
                })
                .catch((err) => {
                    fail("Error creating user for insufficient privileges update failure spec in StaffMember integration test.");
                    done();
                });
        });
    });
});
