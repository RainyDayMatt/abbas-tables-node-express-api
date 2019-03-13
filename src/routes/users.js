const express = require("express");
const router = express.Router();

const validation = require("./validation");
const userController = require("../controllers/userController");

router.post("/users", validation.validateUsers, userController.create);
router.post("/users/sign_in", userController.signIn);

module.exports = router;
