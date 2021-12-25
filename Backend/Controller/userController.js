const Flight = require("../model/flight");
const User = require("../model/user");
const email = require("../Confirmation/email");
const authUtils = require("../utils/auth");

const createFlight = (req, res) => {
  const flight = req.body.flight;
  console.log(flight);
  Flight.create(flight)
    .then((result) => {
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(result, null, 4));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createUser = async (req, res) => {
  const user = req.body.user;
  user.password = await authUtils.hashPass(user.password);
  await User.create(user)
    .then((result) => {
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(result, null, 4));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const findUser = (req, res) => {
  User.findOne({ email: req.params.email }).then((result) => {
    console.log(result);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
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
    console.log(result);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
  });
};
const editSeats = async (req, res) => {
  const flight = req.body.flight;
  const _id = flight._id;
  const chosenSeats = flight.chosenSeats;
  const oldSeats = flight.oldSeats;
  const email = req.body.user.email;
  const reservationID = req.body.reservationID;
  const type = req.body.type;
  const cabin = flight.cabin;

  await Flight.findOne({ _id }).then((flight) => {
    for (let i = 0; i < oldSeats.length; i++) {
      var seat = Number(oldSeats[i].seatNo) - 1;
      flight.seats[seat].reserved = false;
      if (cabin === "economy") {
        flight.economy_seats_available++;
      } else {
        flight.business_seats_available++;
      }
    }
    for (let i = 0; i < chosenSeats.length; i++) {
      var seat = Number(chosenSeats[i].seatNo) - 1;
      flight.seats[seat].reserved = true;
      if (cabin === "economy") {
        flight.economy_seats_available--;
      } else {
        flight.business_seats_available--;
      }
    }

    flight
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });
  await User.findOne({ email }).then((user) => {
    const reservation = user.reservations.find(
      (reservation) => reservation._id == reservationID
    );
    user.reservations = user.reservations.filter(
      (reservation) => reservation._id != reservationID
    );
    console.log(user.reservations);
    if (type === "departure") {
      reservation.departure_flight.chosenSeats = chosenSeats;
    } else if (type === "return") {
      reservation.return_flight.chosenSeats = chosenSeats;
    }

    user.reservations.push(reservation);
    console.log(user);
    user
      .save()
      .then((user) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });
  res.status(200).json({ msg: "updated" });
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
  const flight = req.body;
  const cabin = flight.cabin;
  const seats = Number(flight.passengers);
  delete flight.cabin;
  delete flight.passengers;
  if (cabin === "economy") {
    Flight.find({ ...flight, economy_seats_available: { $gte: seats } }).then(
      (result) => {
        res.header("Content-Type", "application/json");
        res.send(JSON.stringify(result, null, 4));
      }
    );
  } else {
    Flight.find({ ...flight, business_seats_available: { $gte: seats } }).then(
      (result) => {
        res.header("Content-Type", "application/json");
        res.send(JSON.stringify(result, null, 4));
      }
    );
  }
};
const viewReservedFlight = (req, res) => {
  Reservation.find().then((result) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
  });
};

const updateExistingUser = (req, res) => {
  var email = req.params.email;

  User.findOne({ email: email }).then((result) => {
    if (req.body.firstName) {
      result.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      result.lastName = req.body.lastName;
    }
    if (req.body.passportNumber) {
      result.passportNumber = req.body.passportNumber;
    }
    if (req.body.email) {
      result.email = req.body.email;
    }
    if (req.body.countryCode) {
      result.countryCode = req.body.countryCode;
    }
    if (req.body.phoneNumber) {
      result.phoneNumber = req.body.phoneNumber;
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

const cancelReservation = async (req, res) => {
  var email = req.params.email;
  var id = req.params.id;
  var depId = req.body.departureFlight._id;
  var retId = req.body.returnFlight._id;
  var depCabin = req.body.departureFlight.cabin;
  var retCabin = req.body.returnFlight.cabin;
  var depChosenSeats = req.body.departureFlight.chosenSeats;
  var retChosenSeats = req.body.returnFlight.chosenSeats;

  await User.findOne({ email: email }).then((result) => {
    result.reservations = result.reservations.filter(
      (reservation) => reservation._id != id
    );
    // console.log((result.reservations).filter((reservation)=>reservation._id !=id));

    result
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });
  await Flight.findOne({ _id: depId }).then((result) => {
    for (let i = 0; i < depChosenSeats.length; i++) {
      var seat = +depChosenSeats[i].seatNo - 1;
      result.seats[seat].reserved = false;
      if (depCabin === "economy") {
        result.economy_seats_available++;
      } else {
        result.business_seats_available++;
      }
    }

    result
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });
  await Flight.findOne({ _id: retId }).then((result) => {
    for (let i = 0; i < retChosenSeats.length; i++) {
      var seat = +retChosenSeats[i].seatNo - 1;
      result.seats[seat].reserved = false;
      if (retCabin === "economy") {
        result.economy_seats_available++;
      } else {
        result.business_seats_available++;
      }
    }

    result
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });

  res.status(200).json({ msg: "deleted" });
};

const sendConfirmation = (req, res, next) => {
  var user = req.body.user;
  var price = req.body.price;
  var id = req.body.id;

  var mailOptions = {
    to: user.email,
    subject: "Reservation cancellation",
    text: `Your reservation number: ${id} has been cancelled. Total refunded price is ${price}`,
  };
  req.mailOptions = mailOptions;
  email.sendMail(req, res, next);
  res.status(200).json({ message: "Sent successfully" });
};

const sendConfirmationReservation = (req, res, next) => {
  var user = req.body.user;
  var departure_flight = req.body.departureFlight;
  var return_flight = req.body.returnFlight;

  var mailOptions = {
    to: user.email,
    subject: "Reservation Confirmed ",
    text: `

    Departure Flight: ${departure_flight.flight_number} 
    Date:${departure_flight.flight_date} 
    From:${departure_flight.from} 
    To:${departure_flight.to} .

     Return Flight: ${return_flight.flight_number} 
     Date:${return_flight.flight_date} 
     From:${return_flight.from} 
     To:${return_flight.to}. 

     Total Price: ${
       Number(departure_flight.price) + Number(return_flight.price)
     }`,
  };
  req.mailOptions = mailOptions;
  email.sendMail(req, res, next);
  res.status(200).json({ message: "Sent successfully" });
};
const sendItenerary = (req, res, next) => {
  var user = req.body.user;
  var reservation = req.body.reservation;

  var mailOptions = {
    to: user.email,
    subject: "Your Reservation ",
    text: `Your reservation number: ${reservation._id}. 

    Departure Flight: ${reservation.departure_flight.flight_number} 
    Date:${reservation.departure_flight.flight_date} 
    From:${reservation.departure_flight.from} 
    To:${reservation.departure_flight.to} .

     Return Flight: ${reservation.return_flight.flight_number} 
     Date:${reservation.return_flight.flight_date} 
     From:${reservation.return_flight.from} 
     To:${reservation.return_flight.to}. 

     Total Price: ${
       Number(reservation.departure_flight.price) +
       Number(reservation.return_flight.price)
     }`,
  };
  req.mailOptions = mailOptions;
  email.sendMail(req, res, next);
  res.status(200).json({ message: "Sent successfully" });
};

const editReservation = async (req, res) => {
  const email = req.body.user.email;
  const newFlight = req.body.newFlight;

  const { _id, cabin, chosenSeats } = req.body.newFlight;
  var type = req.body.type;
  var reservationID = req.body.reservationID;
  let oldFlight;

  await User.findOne({ email }).then((user) => {
    const reservation = user.reservations.find(
      (reservation) => reservation._id == reservationID
    );
    user.reservations = user.reservations.filter(
      (reservation) => reservation._id != reservationID
    );
    console.log(user.reservations);
    if (type === "departure") {
      oldFlight = reservation.departure_flight;
      reservation.departure_flight = newFlight;
    } else if (type === "return") {
      oldFlight = reservation.return_flight;
      reservation.return_flight = newFlight;
    }

    user.reservations.push(reservation);
    console.log(user);
    user
      .save()
      .then((user) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });

  await Flight.findOne({ _id }).then((flight) => {
    for (let i = 0; i < chosenSeats.length; i++) {
      var seat = Number(chosenSeats[i].seatNo) - 1;
      flight.seats[seat].reserved = true;
      if (cabin === "economy") {
        flight.economy_seats_available--;
      } else {
        flight.business_seats_available--;
      }
    }

    flight
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });
  await Flight.findOne({ _id: oldFlight._id }).then((flight) => {
    console.log(oldFlight.chosenSeats);

    for (let i = 0; i < oldFlight.chosenSeats.length; i++) {
      var seat = Number(oldFlight.chosenSeats[i].seatNo) - 1;
      flight.seats[seat].reserved = false;
      console.log(flight.seats[seat]);
      if (oldFlight.cabin === "economy") {
        flight.economy_seats_available++;
      } else {
        flight.business_seats_available++;
      }
    }

    flight
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });

  res.status(200).json({ msg: "updated" });
};

const addReservation = async (req, res) => {

  var em = req.body.user.email;
  var depId = req.body.departureFlight._id;
  var retId = req.body.returnFlight._id;
  var depCabin = req.body.departureFlight.cabin;
  var retCabin = req.body.returnFlight.cabin;
  var depChosenSeats = req.body.departureFlight.chosenSeats;
  var retChosenSeats = req.body.returnFlight.chosenSeats;

  await User.findOne({ email: em }).then((result) => {
    result.reservations = [
      ...result.reservations,
      {
        departure_flight: req.body.departureFlight,
        return_flight: req.body.returnFlight,
      },
    ];

    result
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });

  await Flight.findOne({ _id: depId }).then((result) => {
    for (let i = 0; i < depChosenSeats.length; i++) {
      var seat = +depChosenSeats[i].seatNo - 1;
      result.seats[seat].reserved = true;
      if (depCabin === "economy") {
        result.economy_seats_available--;
      } else {
        result.business_seats_available--;
      }
    }

    result
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });
  await Flight.findOne({ _id: retId }).then((result) => {
    for (let i = 0; i < retChosenSeats.length; i++) {
      var seat = +retChosenSeats[i].seatNo - 1;
      result.seats[seat].reserved = true;
      if (retCabin === "economy") {
        result.economy_seats_available--;
      } else {
        result.business_seats_available--;
      }
    }

    result
      .save()
      .then((result) => {
        console.log("update is done");
      })
      .catch(() => {
        console.log("Someting is wrong,Try again");
      });
  });

  res.status(200).json({ msg: "updated" });
};

const findUserEmail = async (req, res, next) => {
  try {
    const user = req.body.user;
    const { email } = user;
    const userFound = await User.findOne({ email });
    if (userFound) {
      req.user = userFound;
      next();
    } else {
      const error = new Error("User Not Found");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.admin) {
      req.typeOfUser = "admin";
    } else {
      req.typeOfUser = "user";
    }
    next();
  } catch (err) {
    next(err);
  }
};

const authenticateUser = async (req, res, next) => {
  const passIsValid = await authUtils.comparePass(
    req.body.user.password,
    req.user.password
  );
  if (passIsValid) {
    next();
  } else {
    const err = new Error("Invalid email or password");
    next(err);
  }
};

const generateJWT = async (req, res, next) => {
  try {
    const user = req.user;
    const token = authUtils.generateToken(user);
    if (token) {
      req.token = token;
      next();
    } else {
      const error = new Error("Cannot generate token");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const verifyOldPassword = async (req, res, next) => {
  try {
    const _id = req.body._id;
    const user = await User.findOne({ _id });
    const comparePassword = await authUtils.comparePass(
      req.body.oldPassword,
      user.password
    );
    console.log(req.body.oldPassword);
    if (comparePassword) {
      req.user = user;
      next();
    } else {
      const error = new Error("Wrong password");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await authUtils.hashPass(newPassword);
    req.user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { _id } = req.body;
    const userUpdated = await User.findByIdAndUpdate(_id, user);
    if (userUpdated) {
      req.user = userUpdated;
      next();
    } else {
      const error = new Error("Cannot update user");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const resetPasswordPipeline = [
  verifyOldPassword,
  hashPassword,
  updateUserPassword,
];

const loginPipeline = [
  findUserEmail,
  checkAdmin,
  authenticateUser,
  generateJWT,
];

module.exports = {
  findUser,
  createUser,
  createFlight,
  listFlights,
  loginPipeline,
  resetPasswordPipeline,
  deleteFlight,
  updateFlight,
  showFlight,
  searchFlights,
  userSearchFlights,
  viewReservedFlight,
  updateExistingUser,
  cancelReservation,
  addReservation,
  sendConfirmation,
  editReservation,
  editSeats,
  sendItenerary,
  sendConfirmationReservation,
};
