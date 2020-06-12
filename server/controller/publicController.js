const Admin = require("../models/admin");
const Marchent = require("../models/marchent");
const Man = require("../models/deliveryman");

const jwt = require("jsonwebtoken");

exports.companyList = async (req, res, next) => {
  try {
    let companyList = await Admin.find({})
      .select("company_id")
      .select("company_name");
    return res.status(200).json({
      companyList,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.marchentList = async (req, res, next) => {
  const { company_id } = req.body;
  //console.log(req.body);
  try {
    let marchentList = await Marchent.find({ company_id: company_id })
      .select("_id")
      .select("name");
    return res.status(200).json({
      marchentList,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.marchentList2 = async (req, res, next) => {
  const { company_id } = req.body;
  //console.log(req.body);
  try {
    let marchentList = await Marchent.find({ company_id: company_id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      marchentList,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.manList2 = async (req, res, next) => {
  const { company_id } = req.body;
  //console.log(req.body);
  try {
    let marchentList = await Man.find({ company_id: company_id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      marchentList,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.manList = async (req, res, next) => {
  const { company_id } = req.body;
  try {
    let manList = await Man.find({ company_id })
      .select("_id")
      .select("name")
      .select("area");
    return res.status(200).json({
      manList,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.inactiveItem = async (req, res, next) => {
  let { id, token } = req.body;
  const { role } = jwt.decode(token);
  if (role === "man") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }

  try {
    let marchent = await Marchent.findOne({ _id: id }).select("account_status");

    let updatedRecord = {
      account_status: marchent.account_status === 1 ? 0 : 1,
    };

    let update = await Marchent.findByIdAndUpdate(
      id,
      { $set: updatedRecord },
      { new: true }
    );

    if (update) {
      return res.status(200).json({
        message: "Action Done",
      });
    }
  } catch (e) {
    return res.status(422).json({
      error: e,
    });
  }
};

exports.deleteMarchent = async (req, res, next) => {
  let { id, token } = req.body;
  const { role } = jwt.decode(token);
  if (role === "man") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }
  try {
    let marchent = await Marchent.findOneAndDelete({
      _id: id,
    });
    return res.status(200).json({ message: "success" });
  } catch (e) {
    return res.status(422).json({
      error: "Failed",
    });
  }
};

exports.deleteMan = async (req, res, next) => {
  let { id, token } = req.body;
  const { role } = jwt.decode(token);
  if (role === "man") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }
  try {
    let marchent = await Man.findOneAndDelete({
      _id: id,
    });
    return res.status(200).json({ message: "success" });
  } catch (e) {
    return res.status(422).json({
      error: "Failed",
    });
  }
};
