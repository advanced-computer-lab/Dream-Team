const Flight = require("../model/flight");
const User = require("../model/user");
const Reservation = require("../model/reservation");

const createFlight = (req, res) => {
  const flight = req.body.flight;
  
console.log(req.body.flight);
  Flight
    .create(flight)
    .then((result) => {
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(result, null, 4));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createUser = (req, res) => {
  const user = req.body.user;
  console.log(req.body.user);
  User
    .create(user)
    .then((result) => {
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(result, null, 4));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const findUser=(req,res)=>{
  User.find({email:req.params.email}).then((result) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
  });

}

const listFlights = (req, res) => {
  Flight.find().then((result) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
  });
};

const searchFlights = (req, res) => {
  Flight.find(req.query).then((result) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
  });
};

const showFlight = (req, res) => {
  Flight.findById(req.params.id).then((result) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
  });
};

const deleteFlight = (req, res) => {
  Flight.findByIdAndRemove(req.params.id, req.body)
    .then((result) => res.json({ mgs: "Book entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a flight" }));
};

const updateFlight = (req, res) => {
  var id = req.params.id;

  Flight.findOne({ _id: id }).then((result) => {
    if (req.body.flight_number) {
      result.flight_number = req.body.flight_number;
    }
    if (req.body.arrival_time) {
      result.arrival_time = req.body.arrival_time;
    }
    if (req.body.departure_time) {
      result.departure_time = req.body.departure_time;
    }
    if (req.body.from) {
      result.from = req.body.from;
    }
    if (req.body.to) {
      result.to = req.body.to;
    }
    if (req.body.flight_date) {
      result.flight_date = req.body.flight_date;
    }
    if (req.body.economy_seats_available) {
      result.economy_seats_available = req.body.economy_seats_available;
    }
    if (req.body.business_seats_available) {
      result.business_seats_available = req.body.business_seats_available;
    }

    result
      .save()
      .then((result) => {
        res.send("update is done");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};


const userSearchFlights = (req, res) => {

  const flight= req.body;
  console.log(req.body);
  const cabin=flight.cabin;
  const seats=flight.passengers;
  delete flight.cabin;
  delete flight.passengers;
  if (cabin==="economy"){

    Flight.find({...flight, economy_seats_available:{$gte:seats}}).then((result) => {
      res.header("Content-Type", "application/json");
      console.log("hi");
      res.send(JSON.stringify(result, null, 4));
    });

  }
  else{
    Flight.find({...flight, business_seats_available:{$gte:seats}}).then((result) => {
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(result, null, 4));
    });
  }

};
const viewReservedFlight = (req,res) => {
  Reservation.find().then((result) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
  })
};

const updateExistingUser = (req, res) => {
  var id = req.params.id;

  User.findOne({ _id: id }).then((result) => {
    if (req.body.first_name) {
      result.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
      result.last_name = req.body.last_name;
    }
    if (req.body.passport_number) {
      result.passport_number = req.body.passport_number;
    }
    if (req.body.email) {
      result.email = req.body.email;
    }

    result
      .save()
      .then((result) => {
        res.send("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });
};

const cancelReservedFlight = (req,res) => {
  Reservation.findByIdAndRemove(req.params.id, req.body)
    .then((result) => res.json({ mgs: " Reservations canceled successfully" }))
    .catch((err) => res.status(404).json({ error: "No such Reservation" }));
}
const addReservation = (req, res) => {
  var email = req.body.user.email;

  User.find({email:email}).then((result) =>{
    result.reservations=[...result.reservations, {departure_flight:req.body.departureFlight, return_flight:req.body.returnFlight}]
    
    result
      .save()
      .then((result) => {
        res.send("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });
  
}







module.exports = {
  findUser,
  createUser,
  createFlight,
  listFlights,
  deleteFlight,
  updateFlight,
  showFlight,
  searchFlights,
  userSearchFlights,
  viewReservedFlight,
  updateExistingUser,
  cancelReservedFlight,
  addReservation

};
