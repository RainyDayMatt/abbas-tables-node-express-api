const faker = require("faker");

module.exports = {
    get() {
        return {
            groupName: faker.name.jobTitle(),
            orderNumber: faker.random.number(),
            name: faker.name.firstName() + " " + faker.name.lastName(),
            title: faker.name.jobTitle(),
            bio: faker.lorem.sentence(),
            whichUserCreated: faker.internet.email(),
            whichUserLastChanged: faker.internet.email()
        };
    },
    getDetailed(groupName, orderNumber, name, title, bio, whichUserCreated, whichUserLastChanged) {
        return {
            groupName: groupName,
            orderNumber: orderNumber,
            name: name,
            title: title,
            bio: bio,
            whichUserCreated: whichUserCreated,
            whichUserLastChanged: whichUserLastChanged
        }
    }
};
