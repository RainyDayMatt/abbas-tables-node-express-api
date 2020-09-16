const StaffMember = require("./models/").StaffMember;
const User = require("./models/").User;

const errorMessages = require("../support/dictionaries/errorMessages");

module.exports = {
    checkStaffMemberGroupNameAndNameAvailability(name, groupName, callback) {
        StaffMember.findAll({ where: { name, groupName } })
            .then((staffMembers) => {
                if (staffMembers.length > 0) {
                    callback(errorMessages.getStaffMemberCreationErrorMessages().groupNameAndNameCombinationIsNotUnique);
                } else {
                    callback(null);
                }
            });
    },
    createStaffMember(newStaffMember, creatingUserEmail, callback) {
        return User.findOne({ where: { email: creatingUserEmail } })
            .then((user) => {
                if (!user) {
                    callback([ errorMessages.getStaffMemberCreationErrorMessages().userDoesNotExist ]);
                } else {
                    if (!user.canChangeStaffMembers) {
                        callback([ errorMessages.getStaffMemberCreationErrorMessages().userCannotChangeStaffMembers ]);
                    } else {
                        StaffMember.create(newStaffMember)
                            .then((servingSummary) => {
                                callback(null, servingSummary);
                            })
                            .catch((err) => {
                                callback([ err ]);
                            });
                    }
                }
            });
    },
    getStaffMember(groupName, name, callback) {
        return StaffMember.findOne({ where: { groupName: groupName, name: name } })
            .then((staffMember) => {
                if (!staffMember) {
                    callback([ errorMessages.getStaffMemberUpdateErrorMessages().groupNameAndNameCombinationDoesNotExist ]);
                } else {
                    callback(null, staffMember);
                }
            })
            .catch((err) => {
                callback([ err ]);
            });
    },
    updateStaffMember(groupName, name, updatedStaffMember, updatingUserEmail, callback) {
        return StaffMember.findOne({ where: { groupName: groupName, name: name } })
            .then((staffMember) => {
                if (!staffMember) {
                    callback([ errorMessages.getStaffMemberUpdateErrorMessages().groupNameAndNameCombinationDoesNotExist ]);
                } else {
                    User.findOne({ where: { email: updatingUserEmail } })
                        .then((user) => {
                            if (!user) {
                                callback([ errorMessages.getStaffMemberUpdateErrorMessages().userDoesNotExist ]);
                            } else {
                                if (!user.canChangeStaffMembers) {
                                    callback([ errorMessages.getStaffMemberUpdateErrorMessages().userCannotChangeStaffMembers ]);
                                } else {
                                    staffMember.update(updatedStaffMember, {
                                        fields: Object.keys(updatedStaffMember)
                                    })
                                        .then((updatedStaffMember) => {
                                            callback(null, updatedStaffMember);
                                        })
                                        .catch((err) => {
                                            callback([ err.message ]);
                                        });
                                }
                            }
                        });
                }
            })
            .catch((err) => {
                callback([ err ]);
            });
    },
    getGroup(groupName, callback) {
        return StaffMember.findAll({ where: { groupName: groupName } })
            .then((staffMembers) => {
                if (!staffMembers.length) {
                    callback([ errorMessages.getStaffMemberGroupFetchErrorMessages().groupNameDoesNotExist ]);
                } else {
                    callback(null, staffMembers);
                }
            })
            .catch((err) => {
                callback([ err ]);
            });
    }
};
