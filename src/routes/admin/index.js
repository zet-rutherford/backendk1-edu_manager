var express = require("express");
const dashboardController = require("../../http/controllers/dashboard.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", dashboardController.index);
router.get("/settings", dashboardController.settings);

module.exports = router;
