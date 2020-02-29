const express = require("express");
const router = express.Router();

const validation = require("./validation");
const helpers = require("./helpers");
const servingSummaryController = require("../controllers/servingSummaryController");

router.post("/servingSummaries", validation.validateServingSummaries, helpers.checkServingSummaryDateAvailability, servingSummaryController.create);
router.get("/servingSummaries/year/:year/month/:month/day/:day", servingSummaryController.get);
router.patch("/servingSummaries/year/:year/month/:month/day/:day", validation.validateServingSummaries, servingSummaryController.update);

module.exports = router;
