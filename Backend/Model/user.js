const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reservations: [
    {
      departure_flight: {
        type: Object,
        required: true,
      },
      return_flight: {
        type: Object,
        required: true,
      },
    },
  ],
});

const user = mongoose.model("user", userSchema);
module.exports = user;
