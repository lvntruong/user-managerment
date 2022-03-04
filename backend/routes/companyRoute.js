const companyController = require("../controllers/companyController");
const authMiddleware = require("../middlewares/authMiddleware");

const makeCompanyRouter = (router) => {
  router.post(
    "/company/create",
    [authMiddleware],
    companyController.createCompany
  );
  router.get(
    "/company/read/:id",
    [authMiddleware],
    companyController.readCompany
  );
  router.patch(
    "/company/update/:id",
    [authMiddleware],
    companyController.updateCompany
  );
  router.delete(
    "/company/delete/:id",
    [authMiddleware],
    companyController.deleteCompany
  );
  router.get(
    "/company/search",
    [authMiddleware],
    companyController.searchCompany
  );
  router.get("/company/list", [authMiddleware], companyController.listCompnay);
};

module.exports = makeCompanyRouter;
