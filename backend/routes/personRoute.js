const personController = require("../controllers/personController");
const authMiddleware = require("../middlewares/authMiddleware");

const makePersonRouter = (router) => {
  router.post(
    "/person/create",
    [authMiddleware],
    personController.createPerson
  );
  router.get("/person/read/:id", [authMiddleware], personController.readPerson);
  router.patch(
    "/person/update/:id",
    [authMiddleware],
    personController.updatePerson
  );
  router.delete(
    "/person/delete/:id",
    [authMiddleware],
    personController.deletePerson
  );
  router.get("/person/search", [authMiddleware], personController.searchPerson);
  router.get("/person/list", [authMiddleware], personController.listPerson);
};

module.exports = makePersonRouter;
