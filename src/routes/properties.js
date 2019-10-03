const express = require("express");
const router = express.Router();

const validation = require("./validation");
const propertyController = require("../controllers/propertyController");

router.post("/properties", propertyController.create);
router.get("/properties/:key", propertyController.get);
router.post("/properties/:key/update", propertyController.update);

module.exports = router;
