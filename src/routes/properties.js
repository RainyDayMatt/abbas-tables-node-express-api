const express = require("express");
const router = express.Router();

const validation = require("./validation");
const helpers = require("./helpers");
const propertyController = require("../controllers/propertyController");

router.post("/properties", validation.validateProperties, helpers.checkPropertyKeyAvailability, propertyController.create);
router.get("/properties/:key", propertyController.get);
router.patch("/properties/:key", validation.validateProperties, helpers.checkPropertyKeyAvailability, propertyController.update);

module.exports = router;
