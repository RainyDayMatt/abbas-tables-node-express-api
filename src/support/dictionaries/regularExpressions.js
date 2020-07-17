module.exports = {
    getStaffMemberFieldPatterns() {
        return {
            groupName: "^[a-zA-Z ]+$",
            name: "^[a-zA-Z ]+$",
            title: "^[a-zA-Z ]+$",
            bio: "^[a-zA-Z.'?! ]{1,1000}$"
        }
    }
};
