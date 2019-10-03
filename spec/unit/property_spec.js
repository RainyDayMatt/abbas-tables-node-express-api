const sequelize = require("../../src/db/models/index").sequelize;
const Property = require("../../src/db/models").Property;

describe("Property", () => {
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
            this.propertyCreationOptions = {
                key: "bestDessert",
                value: "Pumpkin Crunch Cake",
                whichUserCreated: "jrigney@gty.org",
                whichUserLastChanged: "jrigney@gty.org"
            };
            done();
        });
        it("Should create a Property object with valid values.", (done) => {
            Property.create(this.propertyCreationOptions)
                .then((property) => {
                    expect(property).not.toBeNull();
                    expect(property.id).toBe(1);
                    expect(property.key).toBe(this.propertyCreationOptions.key);
                    expect(property.value).toBe(this.propertyCreationOptions.value);
                    expect(property.whichUserCreated).toBe(this.propertyCreationOptions.whichUserCreated);
                    expect(property.whichUserLastChanged).toBe(this.propertyCreationOptions.whichUserLastChanged);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
        it("Should not create a Property object with a null key.", (done) => {
            this.propertyCreationOptions.key = null;
            Property.create(this.propertyCreationOptions)
                .then((property) => {
                    fail("Validation failed to catch: null key.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Property.key cannot be null");
                    done();
                });
        });
        it("Should not create a Property object with a duplicate key.", (done) => {
            Property.create(this.propertyCreationOptions)
                .then((property) => {
                    Property.create(this.propertyCreationOptions)
                        .then((secondProperty) => {
                            fail("Validation failed to catch: duplicate key.");
                            done();
                        })
                        .catch((err) => {
                            expect(err.message).toContain("Validation error");
                            done();
                        });
                })
                .catch((err) => {
                    fail("Error creating first property for duplicate key creation failure spec in Property unit test.");
                    done();
                });
        });
        it("Should not create a Property object with a null value.", (done) => {
            this.propertyCreationOptions.value = null;
            Property.create(this.propertyCreationOptions)
                .then((property) => {
                    fail("Validation failed to catch: null value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Property.value cannot be null");
                    done();
                });
        });
        it("Should not create a Property object with a null creating user value.", (done) => {
            this.propertyCreationOptions.whichUserCreated = null;
            Property.create(this.propertyCreationOptions)
                .then((property) => {
                    fail("Validation failed to catch: null creating user value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Property.whichUserCreated cannot be null");
                    done();
                });
        });
        it("Should not create a Property object with a null last changing user value.", (done) => {
            this.propertyCreationOptions.whichUserLastChanged = null;
            Property.create(this.propertyCreationOptions)
                .then((property) => {
                    fail("Validation failed to catch: null last changing user value.");
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Property.whichUserLastChanged cannot be null");
                    done();
                });
        });
    });
});
