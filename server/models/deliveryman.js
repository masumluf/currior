const { Schema, model } = require("mongoose");

const deliverymanSchema = new Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      minlength: 5,
      trim: true,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    bikeRegNumber: {
      type: String,
      trim: true,
      required: true,
    },
    drivingLicense: {
      type: String,
      trim: true,
      required: true,
    },
    referal: {
      type: String,
      trim: true,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "man",
    },
    payment_type: {
      type: String,
    },
    nid: {
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

const Deliveryman = model("Deliveryman", deliverymanSchema);

module.exports = Deliveryman;
