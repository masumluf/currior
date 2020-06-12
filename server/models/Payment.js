const { Schema, model } = require("mongoose");

const PaymentSchema = new Schema(
  {
    description: {
      type: String,
      minlength: 3,
      trim: true,
      required: true,
    },
    company_id: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0,
    },
    marchent: {
      type: Schema.Types.ObjectId,
      ref: "Marchent",
    },
    deliveryman: {
      type: Schema.Types.ObjectId,
      ref: "Deliveryman",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", PaymentSchema);

module.exports = Payment;
