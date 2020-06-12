const { body } = require("express-validator");

const Marchent = require("../../models/marchent");

const Deliverman = require("../../models/deliveryman");

module.exports.manValidator = [
  body("name")
    .isLength({
      min: 3,
    })
    .withMessage("Marchent Name must be 3 to 15 characters "),

  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must be 5 to 15 characters ")
    .custom(async (username) => {
      let user = await Deliverman.findOne({
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
    .withMessage("Address must be Provided."),
  body("phone").not().isEmpty().withMessage("Phone number must be Provided."),
  body("nid")
    .not()
    .isEmpty()
    .withMessage("National ID Card number must be Provided."),
  body("payment_type")
    .not()
    .isEmpty()
    .withMessage("Payment Details must be Provided."),
  body("bikeRegNumber")
    .not()
    .isEmpty()
    .withMessage("Bike Reg Number Details must be Provided."),
  body("drivingLicense")
    .not()
    .isEmpty()
    .withMessage("Driving License Details must be Provided."),
  body("referal")
    .not()
    .isEmpty()
    .withMessage("Referal Details must be Provided."),
  body("area").not().isEmpty().withMessage("Area Details must be Provided."),
];

module.exports.manloginValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must be 5 to 15 characters "),

  body("password")
    .isLength({
      min: 2,
    })
    .withMessage("Password must be more than 2 digits"),
];

module.exports.forgetPasswordValidator = [
  body("email").not().isEmpty().withMessage("Email address must be Provided."),
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
