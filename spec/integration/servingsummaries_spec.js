const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/servingsummaries/";

const sequelize = require("../../src/db/models/index").sequelize;
const ServingSummary = require("../../src/db/models").ServingSummary;
const User = require("../../src/db/models").User;

describe("routes : servingsummaries", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        this.newServingSummary = {
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
    });

    describe("POST /servingsummaries", () => {
        beforeEach((done) => {
            this.servingSummaryCreationOptions = {
                url: base,
                form: this.newServingSummary
            };
            done();
        });
        it("Should create a ServingSummary object with valid values and return it.", (done) => {
            request.post(this.servingSummaryCreationOptions,
                (err, res, body) => {
                    ServingSummary.findOne({
                        where: {
                            year: this.servingSummaryCreationOptions.form.year,
                            month: this.servingSummaryCreationOptions.form.month,
                            day: this.servingSummaryCreationOptions.form.day
                        }
                    })
                        .then((servingsummary) => {
                            expect(servingsummary).not.toBeNull();
                            expect(servingsummary.id).toBe(1);
                            Object.keys(this.servingSummaryCreationOptions.form).forEach((item) => {
                                expect(servingsummary[item]).toBe(this.servingSummaryCreationOptions.form[item]);
                            });
                            // expect(servingsummary.year).toBe(this.servingSummaryCreationOptions.form.year);
                            // expect(servingsummary.month).toBe(this.servingSummaryCreationOptions.form.month);
                            // expect(servingsummary.day).toBe(this.servingSummaryCreationOptions.form.day);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
        // it("Should not create a ServingSummary object with a duplicate key.", (done) => {
        //     ServingSummary.create(this.servingSummaryCreationOptions.form)
        //         .then((servingSummary) => {
        //             request.post(this.servingSummaryCreationOptions,
        //                 (err, res, body) => {
        //                     ServingSummary.findAll({ where: { key: servingSummary.key }})
        //                         .then((properties) => {
        //                             expect(properties.length).toEqual(1);
        //                             expect(JSON.parse(body).err.name).toEqual("SequelizeUniqueConstraintError");
        //                             done();
        //                         })
        //                         .catch((err) => {
        //                             console.log(err);
        //                             done();
        //                         });
        //                 }
        //             );
        //         })
        //         .catch((err) => {
        //             fail("Error creating first servingSummary for duplicate key creation failure spec in ServingSummary integration test.");
        //             done();
        //         });
        // });
    });

    // describe("GET /properties/:key", () => {
    //     beforeEach((done) => {
    //         ServingSummary.create(this.newServingSummary)
    //             .then((servingSummary) => {
    //                 done();
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 done();
    //             });
    //     });
    //     it("Should return the associated ServingSummary object when the correct key is supplied.", (done) => {
    //         request.get(`${base}${this.newServingSummary.key}`,
    //             (err, res, body) => {
    //                 const returnedServingSummary = JSON.parse(body).servingSummary;
    //                 expect(returnedServingSummary.value).toEqual(this.newServingSummary.value);
    //                 done();
    //             }
    //         );
    //     });
    //     it("Should return the appropriate error when a nonexistent key is supplied.", (done) => {
    //         request.get(`${base}bestCollegeFootballTeam`,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body)).toEqual({ err: "ServingSummary with that key doesn't exist." });
    //                 done();
    //             }
    //         );
    //     });
    // });
    //
    // describe("POST /properties/:key/update", () => {
    //     beforeEach((done) => {
    //         ServingSummary.create(this.newServingSummary)
    //             .then((servingSummary) => {
    //                 done();
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 done();
    //             });
    //         this.servingSummaryUpdateOptions = {
    //             url: `${base}${this.newServingSummary.key}/update`,
    //             form: {
    //                 changingUser: "shepard@n7.gov",
    //                 updatedServingSummary: {
    //                     key: "bestDessert",
    //                     value: "Raspberry Crunch Cake"
    //                 }
    //             }
    //         };
    //         this.servingSummaryUpdateUserOptions = {
    //             email: "shepard@n7.gov",
    //             password: "M1nerals21",
    //             passwordConfirmation: "M1nerals21",
    //             firstName: "John",
    //             lastName: "Shepard",
    //             mobilePhone: "5804361776",
    //             canChangeProps: true
    //         };
    //     });
    //     it("Should return the updated ServingSummary object when the update endpoint is provided with acceptable field values.", (done) => {
    //         User.create(this.servingSummaryUpdateUserOptions)
    //             .then((user) => {
    //                 request.post(this.servingSummaryUpdateOptions,
    //                     (err, res, body) => {
    //                         const returnedServingSummary = JSON.parse(body).servingSummary;
    //                         expect(returnedServingSummary.value).toEqual(this.servingSummaryUpdateOptions.form.updatedServingSummary.value);
    //                         done();
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for update success spec in ServingSummary integration test.");
    //                 done();
    //             });
    //     });
    //     it("Should return the appropriate error when a nonexistent key is supplied.", (done) => {
    //         this.servingSummaryUpdateOptions.url = `${base}bestCollegeFootballTeam/update`;
    //         request.post(this.servingSummaryUpdateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body)).toEqual({ err: "ServingSummary with that key doesn't exist." });
    //                 done();
    //             }
    //         );
    //     });
    //     it("Should return the appropriate error when an unregistered user email is supplied.", (done) => {
    //         request.post(this.servingSummaryUpdateOptions,
    //             (err, res, body) => {
    //                 expect(JSON.parse(body)).toEqual({ err: "User with that email doesn't exist." });
    //                 done();
    //             }
    //         );
    //     });
    //     it("Should return the appropriate error when a user email is supplied who doesn't have servingSummary editing privileges.", (done) => {
    //         this.servingSummaryUpdateUserOptions.canChangeProps = false;
    //         User.create(this.servingSummaryUpdateUserOptions)
    //             .then((user) => {
    //                 request.post(this.servingSummaryUpdateOptions,
    //                     (err, res, body) => {
    //                         expect(JSON.parse(body)).toEqual({ err: "User with that email lacks permission to change properties." });
    //                         done();
    //                     }
    //                 );
    //             })
    //             .catch((err) => {
    //                 fail("Error creating user for insufficient privileges update failure spec in ServingSummary integration test.");
    //                 done();
    //             });
    //     });
    // });
});
