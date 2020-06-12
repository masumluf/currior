const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      trim: true,
      unique: true,
      required: true,
    },
    company_name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    account_status: {
      type: String,
      trim: true,
      default: 1,
    },
    role: {
      type: String,
      default: "admin",
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Admin = model("Admin", adminSchema);

module.exports = Admin;
