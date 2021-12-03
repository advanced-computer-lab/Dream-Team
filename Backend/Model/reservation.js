const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema =new Schema({

    user:{
        type: String,
        required: true,
    },

    departure_flight:{
        type: Object,
        required: true,
    },
    return_flight:{
        type: Object,
        required: true,
    },
    departure_seats:[{
        
        seatNo: {type: String, required:true},
        reserved: {type: Boolean, required:true},
        cabin: {type: String, required:true}
      }],
    return_seats:[{
        seatNo: {type: String, required:true},
        reserved: {type: Boolean, required:true},
        cabin: {type: String, required:true}
      }],
    cabin:{
        type:String,
        required:true,
    }

})
const reservation = mongoose.model('reservation', reservationSchema);
module.exports = reservation;