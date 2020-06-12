const { Schema, model } = require("mongoose");

const MarchentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      minlength: 10,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      minlength: 3,
      trim: true,
      required: true,
    },
    nid: {
      type: String,
      trim: true,
      required: true,
    },
    company_id: {
      type: String,
    },
    payment_type: {
      type: String,
      minlength: 3,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 3,
      required: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      default: "marchent",
    },
    account_status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Marchent = model("Marchent", MarchentSchema);

module.exports = Marchent;
