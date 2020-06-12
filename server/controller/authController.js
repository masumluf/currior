//const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/Email");
const Admin = require("../models/admin");
const Marchent = require("../models/marchent");
const Product = require("../models/product");
const Payment = require("../models/Payment");
const Deliveryman = require("../models/deliveryman");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs");
var multer = require("multer");

// get config vars
dotenv.config();

//sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
const { validationResult } = require("express-validator");

const errorFormat = require("../utils/validationErrorFormatter");

// exports.signupView = (req, res, next) => {
//
//     res.render('auth/signup', {
//         title: 'Register as a New User',
//         error: {},
//         value: {},
//         flashMessage: Flash.getMessage(req)
//     })
// }

// exports.signupPost = async (req, res, next) => {
//   let { name, email, password } = req.body;

//   let errorResult = validationResult(req).formatWith(errorFormat);

//   if (!errorResult.isEmpty()) {
//     return res.status(422).json({
//       error: errorResult.mapped(),
//     });
//   }

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(422).json({
//         error:
//           "An user found by this Email. Please try with another Email address.",
//       });
//     }
//     const token = jwt.sign(
//       { name, email, password },
//       process.env.JWT_ACCOUNT_ACTIVATION,
//       { expiresIn: "10m" },
//     );
//     const url = `${process.env.CLIENT_URI}/auth/activation/${token}`;

//     //sendGrid email function
//     // let sendEmail={
//     //     to:email,
//     //     from:'chris@tele2call.com',
//     //     subject:'Account Activation Link',
//     //     text:"Hello.."
//     // };

//     //const mailConfirmation= await sendGrid.send(sendEmail);

//     //console.log(mailConfirmation)

//     //user.password=undefined
//     let msg = `
//             Dear ${name} please click on this link to active your account . Here is your Link ${url}
//         `;

//     sendEmail(email, "Account Activation Email", msg);

//     return res.status(200).json({
//       url,
//       message: "Activation link Sent to your Email.",
//     });
//   } catch (error) {
//     return res.status(402).json({
//       message: error.mapped(),
//     });
//   }
// };

// exports.accountActivation = async (req, res) => {
//   //let errorResult = validationResult(req).formatWith(errorFormat)

//   const { token } = req.body;

//   if (!token) {
//     return res.status(401).json({
//       error: "Sorry Token not Found. Please click on the valid Link",
//     });
//   }

//   const { name, email, password } = jwt.decode(token);

//   try {
//     let userChecking = await User.findOne({ email });
//     if (userChecking) {
//       return res.status(422).json({
//         error: "Account Already Activated.Please Login.",
//       });
//     }

//     await jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

//     let hashPassword = await bcrypt.hash(password, 8);

//     const user = new User({ name, email, password: hashPassword });

//     const userSavingResult = await user.save();

//     if (userSavingResult) {
//       return res.status(200).json({
//         message: "Signup Successfull.",
//       });
//     }
//   } catch (e) {
//     return res.status(401).json({
//       error: e.mapped(),
//     });
//   }
// };

// exports.loginView = (req, res, next) => {
//   // console.log(req.session.user);
//   // console.log(req.session.isLoggedIn);

//   res.render("auth/login", {
//     title: "Login Area",
//     error: {},
//     value: {},
//     flashMessage: Flash.getMessage(req),
//   });
// };

// exports.loginPost = async (req, res, next) => {
//   let errorResult = validationResult(req).formatWith(errorFormat);

//   if (!errorResult.isEmpty()) {
//     return res.status(422).json({
//       error: errorResult.mapped(),
//     });
//   }

//   let { email, password } = req.body;

//   try {
//     let user = await User.findOne({
//       email,
//     });

//     if (!user) {
//       return res.status(422).json({
//         error: "wrong Credentials",
//       });
//     }

//     let isPassword = await bcrypt.compare(password, user.password);
//     if (!isPassword) {
//       return res.status(422).json({
//         error: "wrong Password",
//       });
//     }
//     //sending email...

//     // let msg=`Hello this is an test email ${user}`
//     //
//     // sendEmail(user.email,'Login Successfully',msg)

//     // let emailSend= await sendEmail(user.email,'Login Successfully',msg)
//     //
//     //     if (emailSend){
//     //         console.log('Email has been sent Successfully.')
//     //     } else {
//     //         console.log('Sorry email has not been sent Successfully. Sorry For that')
//     //     }

//     //sending email end...

//     let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     //let { _id, name, email, role } = user;
//     return res.status(200).json({
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       message: "login successfull",
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(402).json({
//       error: e.response.data,
//     });
//   }
// };

// exports.logout = (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.log(err);
//       return next(err);
//     }
//     return res.redirect("/auth/login");
//   });
// };

// exports.passwordGetController = (req, res, next) => {
//   res.render("dashboard/password", {
//     title: "Change Password",
//     flashMessage: Flash.getMessage(req),
//   });
// };

// exports.passwordPostController = async (req, res, next) => {
//   let { oldPassword, newPassword, rePassword } = req.body;

//   if (newPassword !== rePassword) {
//     req.flash("fail", "Password did not match.");
//     return res.redirect("/auth/changepassword");
//   }

//   try {
//     let checkOldPassword = await bcrypt.compare(oldPassword, req.user.password);
//     if (!checkOldPassword) {
//       req.flash("fail", "Invalid Old Password.");
//       return res.redirect("/auth/changepassword");
//     }

//     let hashPassword = await bcrypt.hash(newPassword, 11);
//     await User.findOneAndUpdate(
//       {
//         _id: req.user._id,
//       },
//       {
//         $set: {
//           password: hashPassword,
//         },
//       },
//     );

//     req.flash("success", "Password Has Been Changed.");
//     return res.redirect("/auth/changepassword");
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

exports.addCompanyController = async (req, res, next) => {
  let { company_name, email, password, address, phone } = req.body;

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }

  try {
    // let userChecking = await Admin.findOne({ uid });
    // if (userChecking) {
    //   return res.status(422).json({
    //     error: "Account Already Activated.Please Login.",
    //   });
    // }

    //await jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

    let hashPassword = await bcrypt.hash(password, 8);

    const admin = new Admin({
      company_name,
      email,
      password: hashPassword,
      address,
      phone,
      company_id: Date.now(),
    });

    const userSavingResult = await admin.save();

    if (userSavingResult) {
      return res.status(200).json({
        message: "Company Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(402).json({
      error: error,
    });
  }
};

exports.addMarchentController = async (req, res, next) => {
  //
  let {
    name,
    username,
    password,
    address,
    phone,
    nid,
    company_id,
    payment_type,
    account_status,
  } = req.body;

  console.log(account_status);
  console.log(req.body);

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }

  try {
    // console.log(uid);
    // let userChecking = await Admin.findOne({ company_id:uid });
    // if (userChecking) {
    //   return res.status(422).json({
    //     error: "Account Already Activated.Please Login.",
    //   });
    // }

    //await jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

    let hashPassword = await bcrypt.hash(password, 8);

    const marchent = new Marchent({
      name,
      username,
      password: hashPassword,
      address,
      nid,
      payment_type,
      phone,
      company_id,
      account_status,
    });

    const userSavingResult = await marchent.save();

    if (userSavingResult) {
      return res.status(200).json({
        message: "Marchent Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(402).json({
      error: error,
    });
  }
};

exports.adminLoginController = async (req, res, next) => {
  let { email, password } = req.body;

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }

  try {
    let user = await Admin.findOne({
      email,
    });

    if (!user) {
      return res.status(422).json({
        error: "wrong Credentials",
      });
    }

    let isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(422).json({
        error: "wrong Password",
      });
    }

    if (user.account_status === "0") {
      return res
        .status(422)
        .json({ error: "Account suspendend.Please contact with Admin" });
    }

    let token = jwt.sign(
      { _id: user._id, role: user.role, company_id: user.company_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    //let { _id, name, email, role } = user;
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.company_name,
        role: user.role,
        address: user.address,
        company_id: user.company_id,
        phone: user.phone,
        photo: user.photo,
      },
      message: "login successfull",
    });
  } catch (e) {
    return res.status(422).json({
      error: e,
    });
  }
};

exports.marchentLoginController = async (req, res, next) => {
  let { username, password } = req.body;

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }

  try {
    console.log(username);
    let user = await Marchent.findOne({
      username,
    });

    if (!user) {
      return res.status(422).json({
        error: "wrong Credentials",
      });
    }

    let isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(422).json({
        error: "wrong Password",
      });
    }

    // if (user.account_status === "0") {
    //   return res
    //     .status(422)
    //     .json({ error: "Account Did not activated Yet." });
    // }

    let token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    //let { _id, name, email, role } = user;
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        address: user.address,
        company_id: user.company_id,
        phone: user.phone,
        photo: user.photo,
      },
      message: "login successfull",
    });
  } catch (e) {
    return res.status(422).json({
      error: e,
    });
  }
};

exports.addDeliveryManController = async (req, res, next) => {
  let {
    name,
    username,
    password,
    address,
    phone,
    company_id,
    nid,
    referal,
    drivingLicense,
    bikeRegNumber,
    payment_type,
    area,
  } = req.body;

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }

  try {
    // console.log(uid);
    // let userChecking = await Admin.findOne({ company_id:uid });
    // if (userChecking) {
    //   return res.status(422).json({
    //     error: "Account Already Activated.Please Login.",
    //   });
    // }

    //await jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

    let hashPassword = await bcrypt.hash(password, 8);

    const deliverman = new Deliverman({
      name,
      username,
      password: hashPassword,
      address,
      phone,
      company_id,
      nid,
      referal,
      drivingLicense,
      bikeRegNumber,
      payment_type,
      area,
    });

    const userSavingResult = await deliverman.save();

    if (userSavingResult) {
      return res.status(200).json({
        message: "Deliverman Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(402).json({
      error: error,
    });
  }
};

exports.manLoginController = async (req, res, next) => {
  let { username, password } = req.body;

  console.log(req.body);

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }

  try {
    let user = await Deliveryman.findOne({
      username,
    });

    if (!user) {
      return res.status(422).json({
        error: "wrong Credentials",
      });
    }

    let isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(422).json({
        error: "wrong Password",
      });
    }

    // if (user.account_status === "0") {
    //   return res
    //     .status(422)
    //     .json({ error: "Account Did not activated Yet." });
    // }

    let token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    //let { _id, name, email, role } = user;
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        company_id: user.company_id,
        phone: user.phone,
        photo: user.photo,
      },
      message: "login successfull",
    });
  } catch (e) {
    return res.status(422).json({
      error: e,
    });
  }
};

exports.updateMarchent = async (req, res, next) => {
  let { id, name, address, payment_type, nid, phone, token } = req.body;

  const { role } = jwt.decode(token);

  if (role === "man") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }

  let updatedRecord = {
    name,
    address,
    payment_type,
    nid,
    phone,
  };

  try {
    let product = await Marchent.findByIdAndUpdate(
      id,
      { $set: updatedRecord },
      { new: true }
    );

    if (product) {
      return res.status(200).json({
        message: "Marchent Information Updated Successfully",
      });
    }
  } catch (e) {
    return res.status(422).json({
      error: "Sorry Failed to Update.",
    });
  }
};

exports.updateMan = async (req, res, next) => {
  let {
    id,
    name,
    address,
    payment_type,
    nid,
    phone,
    token,
    drivingLicense,
    bikeRegNumber,
  } = req.body;

  const { role } = jwt.decode(token);

  if (role === "man") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }

  let updatedRecord = {
    name,
    address,
    payment_type,
    nid,
    phone,
    drivingLicense,
    bikeRegNumber,
  };

  try {
    let product = await Deliveryman.findByIdAndUpdate(
      id,
      { $set: updatedRecord },
      { new: true }
    );

    if (product) {
      return res.status(200).json({
        message: "Marchent Information Updated Successfully",
      });
    }
  } catch (e) {
    return res.status(422).json({
      error: "Sorry Failed to Update.",
    });
  }
};

exports.singleMarchentController = async (req, res, next) => {
  let { id } = req.body;
  try {
    let payments = await Payment.find({
      marchent: id,
    });

    let marchents = await Marchent.findOne({
      _id: id,
    })
      .select("name")
      .select("address")
      .select("phone")
      .select("username")
      .select("nid")
      .select("payment_type");

    let products = await Product.find({
      marchent: id,
    });

    return res.status(200).json({
      marchent: { payments, products, marchents },
    });
  } catch (e) {
    return res.status(402).json({
      error: e,
    });
  }
};

exports.singleManController = async (req, res, next) => {
  let { id } = req.body;
  try {
    let payments = await Payment.find({
      deliveryman: id,
    });

    let marchents = await Deliveryman.findOne({
      _id: id,
    })
      .select("name")
      .select("address")
      .select("phone")
      .select("photo")
      .select("payment_type")
      .select("drivingLicense")
      .select("bikeRegNumber")
      .select("referal")
      .select("area");

    let products = await Product.find({
      deliveryman: id,
    });

    return res.status(200).json({
      marchent: { payments, products, marchents },
    });
  } catch (e) {
    return res.status(402).json({
      error: e,
    });
  }
};

exports.singleAdminController = async (req, res, next) => {
  let { id } = req.body;
  try {
    let admin = await Admin.findOne({
      _id: id,
    })
      .select("company_name")
      .select("address")
      .select("phone")
      .select("photo")
      .select("company_id");

    let products = await Product.find({
      company_id: admin.company_id,
    });

    // let payments = await Payment.find({
    //   deliveryman: id,
    // });

    return res.status(200).json({
      marchent: { products, admin },
    });
  } catch (e) {
    return res.status(402).json({
      error: e,
    });
  }
};

exports.dashboardController = async (req, res, next) => {
  let { token } = req.body;

  const { _id, role, company_id } = jwt.decode(token);

  console.log(company_id);

  try {
    if (role === "man") {
      let payments = await Payment.find({
        deliveryman: _id,
      });

      let products = await Product.find({
        deliveryman: _id,
      });

      return res.status(200).json({
        marchent: { payments, products },
      });
    } else if (role === "marchent") {
      let payments = await Payment.find({
        marchent: _id,
      });

      let products = await Product.find({
        marchent: _id,
      });

      return res.status(200).json({
        marchent: { payments, products },
      });
    } else if (role === "admin") {
      let payments = await Payment.find({
        company_id,
      });

      let products = await Product.find({
        company_id,
      });

      return res.status(200).json({
        marchent: { payments, products },
      });
    }
  } catch (e) {
    error: "Something is wrong";
  }
};

exports.profileController = async (req, res, next) => {
  let { token } = req.body;

  const { _id, role, company_id } = jwt.decode(token);

  console.log(company_id);

  try {
    if (role === "man") {
      let result = await Deliveryman.findOne({
        _id,
      });

      return res.status(200).json({
        result,
      });
    } else if (role === "marchent") {
      let result = await Marchent.findOne({
        _id,
      });

      return res.status(200).json({
        result,
      });
    } else if (role === "admin") {
      let result = await Admin.findOne({
        company_id,
      });

      result.password = "";

      return res.status(200).json({
        result,
      });
    }
  } catch (e) {
    error: "Something is wrong";
  }
};

exports.passwordController = async (req, res, next) => {
  let { token, password, confirmpassword } = req.body;

  const { _id, role, company_id } = jwt.decode(token);

  if (password.length === 0 && confirmpassword.length === 0) {
    return res.stats(422).json({
      error: "Password should not be empty",
    });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({
      error: "Password does not match.",
    });
  }

  try {
    password = await bcrypt.hash(password, 8);

    let updatedRecord = {
      password,
    };

    if (role === "man") {
      let result = await Deliveryman.findByIdAndUpdate(
        _id,
        { $set: updatedRecord },
        { new: true }
      );

      return res.status(200).json({
        message: "Password Has been updated",
      });
    } else if (role === "marchent") {
      let result = await Marchent.findByIdAndUpdate(
        _id,
        { $set: updatedRecord },
        { new: true }
      );

      return res.status(200).json({
        message: "Password Has been updated",
      });
    } else if (role === "admin") {
      let result = await Admin.findByIdAndUpdate(
        _id,
        { $set: updatedRecord },
        { new: true }
      );

      return res.status(200).json({
        message: "Password Has been updated",
      });
    }
  } catch (e) {
    error: "Something is wrong";
  }
};

exports.pictureController = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage }).single("file");
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const imagedata = req.file.path;
    console.log(imagedata);

    try {
      let { token } = req.body;

      const { _id, role, company_id } = jwt.decode(token);

      let updatedRecord = {
        photo: req.file.filename,
      };

      if (role === "man") {
        let oldPhoto = await Deliveryman.findOne({ _id });
        if (oldPhoto.photo !== "default.png") {
          fs.unlink(`public/${oldPhoto.photo}`, (err) => {
            if (err) {
              return res.status(503).send("failed");
            }
          });
        }
        let result = await Deliveryman.findByIdAndUpdate(
          _id,
          { $set: updatedRecord },
          { new: true }
        );

        return res.status(200);
      } else if (role === "marchent") {
        let oldPhoto = await Marchent.findOne({ _id });
        if (oldPhoto.photo !== "default.png") {
          fs.unlink(`public/${oldPhoto.photo}`, (err) => {
            if (err) {
              return res.status(503).send("failed");
            }
          });
        }
        let result = await Marchent.findByIdAndUpdate(
          _id,
          { $set: updatedRecord },
          { new: true }
        );

        return res.status(200).send("success");
      } else if (role === "admin") {
        let oldPhoto = await Admin.findOne({ company_id });
        if (oldPhoto.photo !== "default.png") {
          fs.unlink(`public/${oldPhoto.photo}`, (err) => {
            if (err) {
              return res.status(503).send("failed");
            }
          });
        }
        let result = await Admin.findByIdAndUpdate(
          _id,
          { $set: updatedRecord },
          { new: true }
        );

        return res.status(200).send("success");
      }
    } catch (e) {
      return res.status(422);
    }
  });
  // let { token } = req.body;
  // const { _id, role, company_id } = jwt.decode(token);
  //console.log(finalFilename);
};
