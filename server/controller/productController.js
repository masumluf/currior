const Product = require("../models/product");
// const Marchent = require("../models/marchent");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const errorFormat = require("../utils/validationErrorFormatter");

exports.addProduct = async (req, res, next) => {
  let {
    orderid,
    description,
    pickupAddress,
    receiverPhone,
    receiverName,
    amount,
    cost,
    receiverAddress,
    company_id,
    marchent_id,
    pickup,
    deliveryman_id,
    productStatus,
    assigned,
  } = req.body;

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }
  //console.log(marchent_id);
  try {
    const product = new Product({
      orderid,
      description,
      pickupAddress,
      receiverPhone,
      receiverName,
      amount,
      deliveryman: deliveryman_id,
      cost,
      receiverAddress,
      company_id,
      marchent_id,
      pickup,
      marchent: marchent_id,
      productStatus,
      assigned,
    });

    const userSavingResult = await product.save();

    if (userSavingResult) {
      return res.status(200).json({
        message: "Product Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(402).json({
      error: error,
    });
  }
};

exports.getProductsController = async (req, res, next) => {
  let { id, role, company_id } = req.body;

  if (!id) {
    return res.status(402).json({
      error: "Please refresh the page or login.",
    });
  }

  try {
    if (role === "admin") {
      let products = await Product.find({
        company_id: company_id,
      })
        .populate("deliveryman", "name _id")
        .populate("marchent", "name address phone")

        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: products,
      });
    } else if (role === "marchent") {
      let products = await Product.find({
        marchent_id: id,
      }).sort({ createdAt: -1 });

      return res.status(200).json({
        message: products,
      });
    } else if (role === "man") {
      let products = await Product.find({
        deliveryman: id,
      })
        .populate("marchent", "name address phone")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: products,
      });
    }
  } catch (e) {
    return res.status(402).json({
      error: e,
    });
  }
};

exports.updateProductInfoController = async (req, res, next) => {
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
    marchent: marchent_id,
    pickup,
    deliveryman,
    assigned: deliveryman ? true : false,
  };

  try {
    let product = await Product.findByIdAndUpdate(
      id,
      { $set: updatedRecord },
      { new: true }
    );

    if (product) {
      return res.status(200).json({
        message: "Product Information Updated Successfully",
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

exports.updateProductStatusController = async (req, res, next) => {
  let { product_id, stats } = req.body;
  let updatedRecord = {
    productStatus: stats,
  };
  try {
    let product = await Product.findByIdAndUpdate(
      product_id,
      { $set: updatedRecord },
      { new: true }
    );

    if (product) {
      return res.status(200);
    }
  } catch (e) {
    console.log(e);
    return res.status(422);
  }
};
