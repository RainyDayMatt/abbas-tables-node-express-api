const StaffMember = require("./models/").StaffMember;
const User = require("./models/").User;

const errorMessages = require("../support/dictionaries/errorMessages");

module.exports = {
    checkStaffMemberGroupNameAndNameAvailability(name, groupName, callback) {
        StaffMember.findAll({ where: { name, groupName } })
            .then((staffmembers) => {
                if (staffmembers.length > 0) {
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
            .then((staffmember) => {
                if (!staffmember) {
                    callback([ errorMessages.getStaffMemberFetchErrorMessages().groupNameAndNameCombinationDoesNotExist ]);
                } else {
                    callback(null, staffmember);
                }
            })
            .catch((err) => {
                callback([ err ]);
            });
    },
    // updateStaffMember(key, updatedStaffMember, updatingUserEmail, callback) {
    //     return StaffMember.findOne({ where: { key: key } })
    //         .then((staffmember) => {
    //             if (!staffmember) {
    //                 callback([ errorMessages.getStaffMemberUpdateErrorMessages().keyDoesNotExist ]);
    //             } else {
    //                 User.findOne({ where: { email: updatingUserEmail } })
    //                     .then((user) => {
    //                         if (!user) {
    //                             callback([ errorMessages.getStaffMemberUpdateErrorMessages().userDoesNotExist ]);
    //                         } else {
    //                             if (!user.canChangeProps) {
    //                                 callback([ errorMessages.getStaffMemberUpdateErrorMessages().userCannotChangeProperties ]);
    //                             } else {
    //                                 staffmember.update(updatedStaffMember, {
    //                                     fields: Object.keys(updatedStaffMember)
    //                                 })
    //                                     .then((updatedStaffMember) => {
    //                                         callback(null, updatedStaffMember);
    //                                     })
    //                                     .catch((err) => {
    //                                         callback([ err.message ]);
    //                                     });
    //                             }
    //                         }
    //                     });
    //             }
    //         })
    //         .catch((err) => {
    //             callback([ err ]);
    //         });
    // }
};
