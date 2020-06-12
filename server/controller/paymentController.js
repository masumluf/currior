const Payment = require("../models/Payment");
// const Marchent = require("../models/marchent");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const errorFormat = require("../utils/validationErrorFormatter");

exports.getPaymentController = async (req, res, next) => {
  let { id, role, company_id } = req.body;

  const type =
    role === "admin"
      ? "Admin"
      : role === "marchent"
      ? "Marchent"
      : "Deliveryman";

  if (!id) {
    return res.status(402).json({
      error: "Please refresh the page or login.",
    });
  }

  try {
    if (role === "admin") {
      let Payments = await Payment.find({
        company_id: company_id,
      })
        .sort({ createdAt: -1 })
        .populate("deliveryman", "name area phone")
        .populate("marchent", "name phone");

      return res.status(200).json({
        message: Payments,
      });
    } else if (role === "marchent") {
      let Payments = await Payment.find({
        marchent_id: id,
      }).sort({ createdAt: -1 });

      return res.status(200).json({
        message: Payments,
      });
    } else if (role === "man") {
      let Payments = await Payment.find({
        deliveryman: id,
      }).sort({ createdAt: -1 });

      return res.status(200).json({
        message: Payments,
      });
    }
  } catch (e) {
    return res.status(402).json({
      error: e,
    });
  }
};

exports.addPaymentController = async (req, res, next) => {
  const {
    description,
    amount,
    marchent_id,
    deliveryman,
    company_id,
    token,
  } = req.body;

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }
  const { role } = jwt.decode(token);

  if (role === "man") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }
  try {
    const payment = new Payment({
      description,
      amount,
      deliveryman,
      company_id,
      marchent: marchent_id,
    });

    const userSavingResult = await payment.save();

    if (userSavingResult) {
      return res.status(200).json({
        message: "Payment Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(402).json({
      error: error,
    });
  }
};

exports.updatePaymentInfoController = async (req, res, next) => {
  let {
    id,
    description,
    pickupAddress,
    receiverPhone,
    receiverName,
    amount,
    receiverAddress,
    marchent_id,
    pickup,
    deliveryman,
    token,
  } = req.body;

  const { role } = jwt.decode(token);

  if (role === "man") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }

  let updatedRecord = {
    description,
    pickupAddress,
    receiverPhone,
    receiverName,
    amount,
    receiverAddress,
    marchent_id,
    pickup,
    deliveryman,
    assigned: deliveryman ? true : false,
  };

  try {
    let Payment = await Payment.findByIdAndUpdate(
      id,
      { $set: updatedRecord },
      { new: true }
    );

    if (Payment) {
      return res.status(200).json({
        message: "Payment Information Updated Successfully",
      });
    }
  } catch (e) {
    return res.status(422).json({
      error: e,
    });
  }

  //
  //   PostMessage.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
  //       if (!err) res.send(docs)
  //       else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
  //   })
};

exports.removePaymentController = async (req, res, next) => {
  let { id, token } = req.body;
  const { role } = jwt.decode(token);

  if (role === "man") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }

  try {
    let payment = await Payment.findOneAndDelete({
      _id: id,
    });
    return res.status(200).json({ message: "success" });
  } catch (e) {
    return res.status(422).json({
      error: e,
    });
  }
};
