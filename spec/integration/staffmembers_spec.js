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
                            console.log(this.newUser);
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
                    expect(JSON.parse(body).staffmember.bio).toEqual(this.newStaffMember.bio);
                    done();
                }
            );
        });
        // it("Should return the appropriate error when a nonexistent date is supplied.", (done) => {
        //     request.get(`${ base }year/${ this.newStaffMember.year }/month/${ this.newStaffMember.month }/day/${ this.newStaffMember.day+1 }`,
        //         (err, res, body) => {
        //             expect(JSON.parse(body).err.length).toBe(1);
        //             expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberUpdateErrorMessages().dateDoesNotExist);
        //             done();
        //         }
        //     );
        // });
    });

    // describe("PATCH /staffMembers/year/:year/month/:month/day/:day", () => {
    //     beforeEach((done) => {
    //         this.staffMemberUpdateUser = userFactory.get();
    //         this.staffMemberUpdateUser.canEnterMealCount = true;
    //         StaffMember.create(this.newStaffMember)
    //             .then((staffMember) => {
    //                 done();
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 done();
    //             });
    //         this.staffMemberUpdateOptions = {
    //             url: `${ base }year/${ this.newStaffMember.year }/month/${ this.newStaffMember.month }/day/${ this.newStaffMember.day }`,
    //             form: {
    //                 notes: "Supervisor defeated by the Chosen Undead.",
    //                 whichUserLastChanged: this.staffMemberUpdateUser.email
    //             }
    //         };
    //     });
    //     it("Should return the updated StaffMember object when the update endpoint is provided with acceptable field values.", (done) => {
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         expect(JSON.parse(body).staffMember.notes).toEqual(this.staffMemberUpdateOptions.form.notes);
    //                         done();
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for update success spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should return the appropriate error when a nonexistent date is supplied.", (done) => {
    //         this.staffMemberUpdateOptions.url = `${ base }year/${ this.newStaffMember.year }/month/${ this.newStaffMember.month }/day/${ this.newStaffMember.day+1 }`;
    //         request.patch(this.staffMemberUpdateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body).err.length).toBe(1);
    //                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberUpdateErrorMessages().dateDoesNotExist);
    //                 done();
    //             }
    //         );
    //     });
    //     it("Should not update a StaffMember object with an invalid year value.", (done) => {
    //         this.staffMemberUpdateOptions.form.year = "sqlInjection";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().yearIsNotNumeric);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid year update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should not update a StaffMember object with an invalid month value.", (done) => {
    //         this.staffMemberUpdateOptions.form.month = "sqlInjection";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().monthIsNotNumeric);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid month update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should not update a StaffMember object with an invalid day value.", (done) => {
    //         this.staffMemberUpdateOptions.form.day = "sqlInjection";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().dayIsNotNumeric);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid day update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should not update a StaffMember object with an invalid total meals value.", (done) => {
    //         this.staffMemberUpdateOptions.form.totalMeals = "sqlInjection";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().totalMealsIsNotNumeric);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid total meals update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should not update a StaffMember object with an invalid adult guest meals value.", (done) => {
    //         this.staffMemberUpdateOptions.form.adultGuestMeals = "sqlInjection";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().adultGuestMealsIsNotNumeric);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid adult guest meals update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should not update a StaffMember object with an invalid child guest meals value.", (done) => {
    //         this.staffMemberUpdateOptions.form.childGuestMeals = "sqlInjection";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().childGuestMealsIsNotNumeric);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid child guest meals update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should not update a StaffMember object with an invalid volunteer meals value.", (done) => {
    //         this.staffMemberUpdateOptions.form.volunteerMeals = "sqlInjection";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().volunteerMealsIsNotNumeric);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid volunteer meals update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should not update a StaffMember object with an invalid creating user value.", (done) => {
    //         this.staffMemberUpdateOptions.form.whichUserCreated = "ShepardAtn7Dotgov";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().whichUserCreatedEmailIsInvalid);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid creating user email update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should not update a StaffMember object with an invalid last changing user value.", (done) => {
    //         this.staffMemberUpdateOptions.form.whichUserLastChanged = "ShepardAtn7Dotgov";
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         StaffMember.findOne({ where: {
    //                                 year: this.newStaffMember.year,
    //                                 month: this.newStaffMember.month,
    //                                 day: this.newStaffMember.day
    //                             } })
    //                             .then((staffMember) => {
    //                                 expect(staffMember.notes).toEqual(this.newStaffMember.notes);
    //                                 expect(JSON.parse(body).err.length).toBe(1);
    //                                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().whichUserLastChangedEmailIsInvalid);
    //                                 done();
    //                             })
    //                             .catch((err) => {
    //                                 console.log(err);
    //                                 done();
    //                             });
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for invalid last changing user email update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should return the appropriate error when an invalid user email is supplied.", (done) => {
    //         this.staffMemberUpdateOptions.form.whichUserLastChanged = "ShepardAtn7Dotgov";
    //         request.patch(this.staffMemberUpdateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body).err.length).toBe(1);
    //                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberCreationErrorMessages().whichUserLastChangedEmailIsInvalid);
    //                 done();
    //             }
    //         );
    //     });
    //     it("Should return the appropriate error when an unregistered user email is supplied.", (done) => {
    //         request.patch(this.staffMemberUpdateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body).err.length).toBe(1);
    //                 expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberUpdateErrorMessages().userDoesNotExist);
    //                 done();
    //             }
    //         );
    //     });
    //     it("Should return the appropriate error when a user email is supplied who doesn't have meal entering privileges.", (done) => {
    //         this.staffMemberUpdateUser.canEnterMealCount = false;
    //         User.create(this.staffMemberUpdateUser)
    //             .then((user) => {
    //                 request.patch(this.staffMemberUpdateOptions,
    //                     (err, res, body) => {
    //                         expect(JSON.parse(body).err.length).toBe(1);
    //                         expect(JSON.parse(body).err[0]).toBe(errorMessages.getStaffMemberUpdateErrorMessages().userCannotEnterMealCounts);
    //                         done();
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for insufficient privileges update failure spec in StaffMember integration test.");
    //                 done();
    //             });
    //     });
    // });
    //
    // describe("GET /staffMembers/year/:year/month/:month", () => {
    //     beforeEach((done) => {
    //         this.firstStaffMember = staffMemberFactory.getDetailed(2020, 1, 1, 45, 30, 10, 5);
    //         this.secondStaffMember = staffMemberFactory.getDetailed(2020, 1, 2, 60, 45, 10, 5);
    //         this.thirdStaffMember = staffMemberFactory.getDetailed(2020, 2, 1, 75, 60, 10, 5);
    //         StaffMember.bulkCreate([ this.firstStaffMember, this.secondStaffMember, this.thirdStaffMember ])
    //             .then((staffMembers) => {
    //                 done();
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 done();
    //             });
    //         this.staffMemberAggregateOptions = {
    //             url: `${ base }year/${ this.firstStaffMember.year }/month/${ this.firstStaffMember.month }`
    //         };
    //     });
    //     it("Should return the appropriate totals when a year and month are supplied for which there are numbers.", (done) => {
    //         request.get(this.staffMemberAggregateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body).monthSummary.totalMeals).toBe(this.firstStaffMember.totalMeals + this.secondStaffMember.totalMeals);
    //                 expect(JSON.parse(body).monthSummary.adultGuestMeals).toBe(this.firstStaffMember.adultGuestMeals + this.secondStaffMember.adultGuestMeals);
    //                 expect(JSON.parse(body).monthSummary.childGuestMeals).toBe(this.firstStaffMember.childGuestMeals + this.secondStaffMember.childGuestMeals);
    //                 expect(JSON.parse(body).monthSummary.volunteerMeals).toBe(this.firstStaffMember.volunteerMeals + this.secondStaffMember.volunteerMeals);
    //                 done();
    //             });
    //     });
    //     it("Should return the appropriate totals when a year and month are supplied for which there aren't numbers.", (done) => {
    //         this.staffMemberAggregateOptions.url = `${ base }year/${ this.firstStaffMember.year + 3 }/month/${ this.firstStaffMember.month + 3 }`;
    //         request.get(this.staffMemberAggregateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body).monthSummary.totalMeals).toBe(0);
    //                 expect(JSON.parse(body).monthSummary.adultGuestMeals).toBe(0);
    //                 expect(JSON.parse(body).monthSummary.childGuestMeals).toBe(0);
    //                 expect(JSON.parse(body).monthSummary.volunteerMeals).toBe(0);
    //                 done();
    //             });
    //     });
    // });
    //
    // describe("GET /staffMembers/year/:year", () => {
    //     beforeEach((done) => {
    //         this.firstStaffMember = staffMemberFactory.getDetailed(2020, 1, 1, 45, 30, 10, 5);
    //         this.secondStaffMember = staffMemberFactory.getDetailed(2020, 1, 2, 60, 45, 10, 5);
    //         this.thirdStaffMember = staffMemberFactory.getDetailed(2021, 1, 3, 75, 60, 10, 5);
    //         StaffMember.bulkCreate([ this.firstStaffMember, this.secondStaffMember, this.thirdStaffMember ])
    //             .then((staffMembers) => {
    //                 done();
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 done();
    //             });
    //         this.staffMemberAggregateOptions = {
    //             url: `${ base }year/${ this.firstStaffMember.year }`
    //         };
    //     });
    //     it("Should return the appropriate totals when a year is supplied for which there are numbers.", (done) => {
    //         request.get(this.staffMemberAggregateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body).yearSummary.totalMeals).toBe(this.firstStaffMember.totalMeals + this.secondStaffMember.totalMeals);
    //                 expect(JSON.parse(body).yearSummary.adultGuestMeals).toBe(this.firstStaffMember.adultGuestMeals + this.secondStaffMember.adultGuestMeals);
    //                 expect(JSON.parse(body).yearSummary.childGuestMeals).toBe(this.firstStaffMember.childGuestMeals + this.secondStaffMember.childGuestMeals);
    //                 expect(JSON.parse(body).yearSummary.volunteerMeals).toBe(this.firstStaffMember.volunteerMeals + this.secondStaffMember.volunteerMeals);
    //                 done();
    //             });
    //     });
    //     it("Should return the appropriate totals when a year is supplied for which there aren't numbers.", (done) => {
    //         this.staffMemberAggregateOptions.url = `${ base }year/${ this.firstStaffMember.year + 3 }`;
    //         request.get(this.staffMemberAggregateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body).yearSummary.totalMeals).toBe(0);
    //                 expect(JSON.parse(body).yearSummary.adultGuestMeals).toBe(0);
    //                 expect(JSON.parse(body).yearSummary.childGuestMeals).toBe(0);
    //                 expect(JSON.parse(body).yearSummary.volunteerMeals).toBe(0);
    //                 done();
    //             });
    //     });
    // });
});
