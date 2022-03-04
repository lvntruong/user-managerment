const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const makeAuthRouter = (router) => {
  router.post("/login", authController.login);
  router.post("/logout", [authMiddleware], authController.logout);
  router.post("/register", authController.register);
};

module.exports = makeAuthRouter;
