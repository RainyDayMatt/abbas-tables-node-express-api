const staffMemberQueries = require("../db/queries.staffMembers");
const staffMemberFields = require("../support/modelDefinitions/staffMemberSource").getFields();

module.exports = {
    create(req, res, next) {
        staffMemberQueries.createStaffMember(req.body, req.body.whichUserCreated, (err, staffMember) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ staffMember: staffMember });
            }
        });
    },
    get(req, res, next) {
        staffMemberQueries.getStaffMember(req.params.groupName, req.params.name, (err, staffMember) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ staffMember: staffMember });
            }
        });
    },
    update(req, res, next) {
        staffMemberQueries.updateStaffMember(req.params.groupName, req.params.name, req.body, req.body.whichUserLastChanged, (err, staffMember) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ staffMember: staffMember });
            }
        });
    },
    getGroup(req, res, next) {
        staffMemberQueries.getGroup(req.params.groupName, (err, staffMembers) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ staffMembers: staffMembers });
            }
        });
    }
};
