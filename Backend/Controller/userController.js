const Flight = require("../model/flight");

const createFlight = (req, res) => {
  const flight = req.body.flight;
  // const flight = new Flight({
  //   flight_number: req.body.flight_number,
  //   flight_date: req.body.flight_date,
  //   from: req.body.from,
  //   to: req.body.to,
  //   departure_time: req.body.departure_time,
  //   arrival_time: req.body.arrival_time,
  //   economy_seats_available: req.body.economy_seats_available,
  //   business_seats_available: req.body.business_seats_available,
  //   price_economy: req.body.price_economy,
  //   price_business: req.body.price_business,
  //   departure_terminal: req.body.departure_terminal,
  //   arrival_terminal: req.body.arrival_terminal,
  //   baggage_allowance: req.body.baggage_allowance,
  //   duration: req.body.duration,
  
  // })
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





module.exports = {
  createFlight,
  listFlights,
  deleteFlight,
  updateFlight,
  showFlight,
  searchFlights,
  userSearchFlights,
};
