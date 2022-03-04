const router = require("express").Router();

const makeCompanyRouter = require("./companyRoute");
const makePersonRouter = require("./personRoute");
const makeAuthRouter = require("./authRoute");

makeCompanyRouter(router);

makePersonRouter(router);

makeAuthRouter(router);

module.exports = router;
