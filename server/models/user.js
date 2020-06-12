const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 3,
      required: true,
    },

    role: {
      type: String,
      default: "subscriber",
    },
    passwordResetLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;
