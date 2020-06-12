const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    orderid: {
      type: String,
      required: true,
    },
    marchent_id: {
      type: String,
      required: true,
    },
    marchent: {
      type: Schema.Types.ObjectId,
      ref: "Marchent",
    },
    pickup: {
      type: Boolean,
      default: false,
      required: true,
    },
    pickupAddress: {
      type: String,
      trim: true,
    },
    deliveryman: {
      type: Schema.Types.ObjectId,
      ref: "Deliveryman",
    },

    amount: {
      type: Number,
      trim: true,
      default: 0,
    },
    cost: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    receiverName: {
      type: String,
      trim: true,
      required: true,
    },
    receiverAddress: {
      type: String,
      trim: true,
      required: true,
    },
    receiverPhone: {
      type: String,
      trim: true,
      required: true,
    },
    productStatus: {
      type: String,
    },
    assigned: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
