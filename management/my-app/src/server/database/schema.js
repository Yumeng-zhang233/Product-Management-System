//schema => define field => generate model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        itemAdded: String,
        count: Number,
      },
    ],
    id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
