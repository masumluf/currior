const express = require("express");
const router = express.Router();
const {
  signupPost,
  accountActivation,
  loginPost,
  addCompanyController,
  adminLoginController,
  addMarchentController,
  marchentLoginController,
  addDeliveryManController,
  manLoginController,
  updateMarchent,
  updateMan,
  singleMarchentController,
  singleManController,
  dashboardController,
  profileController,
  passwordController,
  pictureController,
} = require("../controller/authController");

const {
  companyList,
  marchentList,
  manList,
  marchentList2,
  inactiveItem,
  deleteMarchent,
  manList2,
  deleteMan,
} = require("../controller/publicController");

const {
  addProduct,
  getProductsController,
  updateProductInfoController,
  updateProductStatusController,
} = require("../controller/productController");

const {
  getPaymentController,
  addPaymentController,
  removePaymentController,
} = require("../controller/paymentController");

const {
  adminSignUpValidator,
} = require("../middleware/validator/signupValidator");

const {
  loginValidator,
} = require("../middleware/validator/adminLoginValidation");

const {
  marchentValidator,
  marchentloginValidator,
} = require("../middleware/validator/marchentValidation");

const {
  manValidator,
  manloginValidator,
} = require("../middleware/validator/deliverymanValidation");

const {
  productValidator,
  paymentValidator,
} = require("../middleware/validator/productValidation");

//dashboard

router.post("/dashboard", dashboardController);
router.post("/profile", profileController);
router.post("/picture", pictureController);
router.post("/password", passwordController);

//router.post("/signup", signUpValidator, signupPost);

router.post("/addcompany", adminSignUpValidator, addCompanyController);
router.post("/addmarchent", marchentValidator, addMarchentController);
router.post("/adddeliveryman", manValidator, addDeliveryManController);

//Marchent signup api
//router.post("/addmarchent", marchentValidator, addMarchentController);

//Porduct releated API
router.post("/getproducts", getProductsController);
router.put("/updateproduct", updateProductInfoController);
router.put("/updateproductstatus", updateProductStatusController);

//Payment related api
router.post("/getpayment", getPaymentController);
router.post("/addpayment", paymentValidator, addPaymentController);
router.delete("/removepayment", removePaymentController);

//login API

router.post("/adminlogin", loginValidator, adminLoginController);
router.post("/marchentlogin", marchentloginValidator, marchentLoginController);
router.post("/manlogin", manloginValidator, manLoginController);

// Marchent releated API

router.get("/getcompanylist", companyList);
router.post("/getmarchentlist", marchentList);
router.post("/getmarchentlists", marchentList2);
router.post("/getmanlist", manList);
router.put("/inactiveitem", inactiveItem);
router.delete("/removemarchent", deleteMarchent);
router.put("/updatemarchent", updateMarchent);
router.post("/singlemarchent", singleMarchentController);

// Man releated api

router.post("/getmanlists", manList2);
router.delete("/removeman", deleteMan);
router.put("/updateman", updateMan);
router.post("/singleman", singleManController);

// router.post("/account-activation", accountActivation);

// router.post("/login", loginValidator, loginPost);

// Product releated API
router.post("/addproduct", productValidator, addProduct);

module.exports = router;
