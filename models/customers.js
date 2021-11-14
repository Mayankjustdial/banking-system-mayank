const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    require: true,
    min: 0
  }
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
