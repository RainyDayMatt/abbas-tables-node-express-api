const express = require("express");
const router = express.Router();

const validation = require("./validation");
const helpers = require("./helpers");
const staffMemberController = require("../controllers/staffMemberController");

router.post("/staffMembers", validation.validateStaffMembers, helpers.checkStaffMemberGroupNameAndNameAvailability, staffMemberController.create);
router.get("/staffMembers/groupName/:groupName/name/:name", staffMemberController.get);
router.patch("/staffMembers/groupName/:groupName/name/:name", validation.validateStaffMembers, staffMemberController.update);
router.get("/staffMembers/groupName/:groupName", staffMemberController.getGroup);

module.exports = router;
