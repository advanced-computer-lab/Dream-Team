const Flight = require("../model/flight");
const User = require("../model/user");
const Reservations = require("../model/reservations");

const createFlight = (req, res) => {
  const flight = new Flight({
    flight_number: req.body.flight_number,
    flight_date: req.body.flight_date,
    from: req.body.from,
    to: req.body.to,
    departure_time: req.body.departure_time,
    arrival_time: req.body.arrival_time,
    economy_seats_available: req.body.economy_seats_available,
    business_seats_available: req.body.business_seats_available,
    price_economy: req.body.price_economy,
    price_business: req.body.price_business,
    departure_terminal: req.body.departure_terminal,
    arrival_terminal: req.body.arrival_terminal,
    baggage_allowance: req.body.baggage_allowance,
    array_business: new Array(req.body.business_seats_available).fill(false),
    array_economy: new Array(req.body.economy_seats_available).fill(false),
  })

  flight
    .save()
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

const viewReservedFlight = (req,res) => {
  Reservations.find().then((result) => {
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
      .catch((err) => {
        console.log(err);
      });
  });
};







module.exports = {
  createFlight,
  listFlights,
  deleteFlight,
  updateFlight,
  showFlight,
  searchFlights,
  viewReservedFlight,
  updateExistingUser
};
