const { body } = require("express-validator");

const Marchent = require("../../models/marchent");

module.exports.marchentValidator = [
  body("name")
    .isLength({
      min: 5,
    })
    .withMessage("Marchent Name must be 2 to 15 characters "),

  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must be 5 to 15 characters ")
    .custom(async (username) => {
      let user = await Marchent.findOne({
        username,
      });
      if (user) {
        return Promise.reject("Username already exist");
      }
      return true;
    }),

  body("password")
    .isLength({
      min: 2,
    })
    .withMessage("Password must be more than 2 digits"),

  body("address")
    .isLength({
      min: 10,
    })
    .withMessage("Address must be more than 10 digits")
    .not()
    .isEmpty()
    .withMessage("Company address must be Provided."),
  body("phone").not().isEmpty().withMessage("Phone number must be Provided."),
  body("nid")
    .not()
    .isEmpty()
    .withMessage("National ID Card number must be Provided."),
  body("payment_type")
    .not()
    .isEmpty()
    .withMessage("Payment Details must be Provided."),
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
