const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passport_number: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reservations: [{
    
  departure_flight:{
      type: Object,
      required: true,
  },
  return_flight:{
      type: Object,
      required: true,
  },
 
    
  }],
});

const user = mongoose.model("user", userSchema);
module.exports = user;
