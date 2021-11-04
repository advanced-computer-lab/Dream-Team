const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const flightSchema= new Schema({ flight_number: Number, from: String, to: String, flight_date: Date, cabin: String, seats_available: Number})

const Flight = mongoose.model('Flight', flightSchema);
module.exports = User;
