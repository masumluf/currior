const { Schema, model } = require("mongoose");

const deliveryManAccountSchema = new Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    deliveryManId: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const DeliveryManAccount = model(
  "DeliveryManAccount",
  deliveryManAccountSchema,
);

module.exports = DeliveryManAccount;
