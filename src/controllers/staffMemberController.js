const staffMemberQueries = require("../db/queries.staffMembers");
const staffMemberFields = require("../support/modelDefinitions/staffMemberSource").getFields();

module.exports = {
    create(req, res, next) {
        staffMemberQueries.createStaffMember(req.body, req.body.whichUserCreated, (err, staffmember) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ staffmember: staffmember });
            }
        });
    },
    get(req, res, next) {
        staffMemberQueries.getStaffMember(req.params.groupName, req.params.name, (err, staffmember) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ staffmember: staffmember });
            }
        });
    },
    // update(req, res, next) {
    //     staffmemberQueries.updateStaffMember(req.params.key, req.body, req.body.whichUserLastChanged, (err, staffmember) => {
    //         if (err) {
    //             res.status(400).json({ err: err });
    //         } else {
    //             res.status(200).json({ staffmember: staffmember });
    //         }
    //     });
    // }
};
