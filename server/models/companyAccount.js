const { Schema, model } = require("mongoose");

const companyAccountSchema = new Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      minlength: 5,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      trim: true,
      required: true,
    },
    payment_type: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CompanyAccount = model("CompanyAccount", companyAccountSchema);

module.exports = CompanyAccount;
