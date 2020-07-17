module.exports = {
    get() {
        return {
            groupName: "Andromeda Initiative",
            orderNumber: 1,
            name: "Scott Ryder",
            title: "Human Pathfinder",
            bio: "Lorem ipsum video game reference.",
            whichUserCreated: "sara_ryder@ai.org",
            whichUserLastChanged: "scott_ryder@ai.org"
        };
    },
    getDetailed(groupName, orderNumber, name, title, bio) {
        return {
            groupName: groupName,
            orderNumber: orderNumber,
            name: name,
            title: title,
            bio: bio,
            childGuestMeals: childGuestMeals,
            volunteerMeals: volunteerMeals,
            whichUserCreated: "sara_ryder@ai.org",
            whichUserLastChanged: "scott_ryder@ai.org"
        }
    }
};
