const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flight_number: {
    type: Number,
    required: true,
  },

  flight_date: {
    type: Date,
    required: false,
  },

  from: {
    type: String,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },

  departure_time: {
    type: String,
    required: true,
  },

  arrival_time: {
    type: String,
    required: true,
  },

  economy_seats_available: {
    type: Number,
    required: true,
  },

  business_seats_available: {
    type: Number,
    required: true,
  },
  price:{
    type: Number,
    required:true,
  },
  departure_terminal:{
    type: Number,
    required: true,
  },
  arrival_terminal:{
    type: Number,
    required: true,
  },
  baggage_allowance:{
    type: String,
    required: true,
  },
  duration:{
    type: String,
    required: true,
  }

});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;

