const express = require("express");
const router = express.Router();

const validation = require("./validation");
const servingSummaryController = require("../controllers/servingSummaryController");

router.post("/servingSummaries", servingSummaryController.create);
router.get("/servingSummaries/year/:year/month/:month/day/:day", servingSummaryController.get);
router.post("/servingSummaries/year/:year/month/:month/day/:day", servingSummaryController.update);

module.exports = router;
