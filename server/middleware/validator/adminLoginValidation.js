const { body } = require("express-validator");

const Admin = require("../../models/admin");


module.exports.loginValidator = [
  body("email")
  .not()
  .isEmpty()
  .withMessage("Email address must be Provided.")
  .isEmail().withMessage("Email format is wrong").normalizeEmail(),
  body("password")
  .not()
  .isEmpty()
  .withMessage("Password must be Provided.")
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
