const { body } = require("express-validator");

const Marchent = require("../../models/marchent");

module.exports.productValidator = [
  body("receiverAddress")
    .isLength({
      min: 10,
    })
    .withMessage("Receiver Address must be more than 10 digits")
    .not()
    .isEmpty()
    .withMessage("Reciver address must be Provided."),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Product Details must be Provided."),
  body("receiverPhone")
    .not()
    .isEmpty()
    .withMessage("Phone number must be Provided."),
  body("receiverName")
    .not()
    .isEmpty()
    .withMessage("Receiver Name must be Provided."),
];

module.exports.paymentValidator = [
  body("amount").not().isEmpty().withMessage("Amount must be Provided."),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Description must be Provided."),
];

module.exports.marchentloginValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must be 5 to 15 characters ")
    .custom(async (username) => {
      let user = await Marchent.findOne({
        username,
      });

      if (user.account_status === 0) {
        return Promise.reject("Account did not Activated Yet.");
      }

      if (!user) {
        return Promise.reject("Username not exist");
      }
      return true;
    }),
  body("password")
    .isLength({
      min: 2,
    })
    .withMessage("Password must be more than 2 digits"),
];

module.exports.forgetPasswordValidator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address must be Provided.")
    .isEmail()
    .withMessage("Email format is wrong")
    .normalizeEmail(),
];

module.exports.forgetPasswordValidationActive = [
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password Required.")
    .isLength({
      min: 2,
    })
    .withMessage("Password must be more than 2 digits"),

  body("repassword")
    .isLength({
      min: 2,
    })
    .withMessage("Password must be more than 2 digits")
    .custom((repassword, { req }) => {
      if (repassword != req.body.password) {
        throw new Error("Password dosent not match");
      }
      return true;
    }),
];
