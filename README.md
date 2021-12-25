# Dream Team 

# Project Report :  

**Project Title**:
This project is a website for an Airline Online System named Dream Airlines. Users can search for available flights all over the world by specifying the dates and countries they wish to visit. The website shows the user all available flight with corresponding prices and the user can reserve the flights and pay for them with a click of a button.

**Motivation**:
This project was built to make it easier for the client to search,reserve and pay for flights instead of the client going all the way to the airport
to do all that and waste time. 

**Build Status**:
Our Website is fully functional regarding the searching of flights and reserving seats but there is minor bug in the payment module 


**Code Styles**:
We aim for our code to be easy to read so here are some code styles we used:
1-Vertical indents: empty lines inside functions for splitting code into logical blocks.
2-meaningful variable names
3-Prettier code formatter for easier code reading


**Screenshots**:
here is a link for a demo of our website: https://drive.google.com/file/d/1c-Ni446fvAGuK93HELmm2BpknOOPnHSt/view?usp=sharing


**Tech/Framework used**:
this project is implented using the mern(MongoDB,Express,React,NodeJS)stack.
additional tech used:
axios is used as the api between front end and server,
mongoose is used as the api between server and mongoDB,
nodemailer is used to email the user,
stripe API is used for payment.


**Features**:
In the website, you can smoothly navigate through it and find anything you want. A user can search for flights based on travel dates, destinations, number of passengers and canin class. The website will list all the flight that match the criteria (our websites always assume thatreservation is a roundtrip) and the user can pick any departure and return flight based on prices or departure and arrival times. The user can then continue to choose the seats he/she wants but from this point a user must login to continue choosing the sesats and paying. The website allows the user to sign up if he/she does not already has an account. The user can the confirm the seats and pay for the reservation. A confirmation email will be sent to the user. The website gives the user a chance to change the reserved seats on a specific flight or reserve another departure/return flight with different date or cabin and it also give the user a chance to cancel the whole reservation. on the home page of alogged in user he/she can show all his/her reservations and email the itinerary yo themselves. Another feature that our website offers is editing the users information including the password.
 

**Code Examples**:
const userSearchFlights = (req, res) => {
  const flight = req.body;
  console.log(req.body);
  const cabin = flight.cabin;
  const seats = Number(flight.passengers);
  delete flight.cabin;
  delete flight.passengers;
  if (cabin === "economy") {
    Flight.find({ ...flight, economy_seats_available: { $gte: seats } }).then(
      (result) => {
        res.header("Content-Type", "application/json");
        console.log("hi");
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

const addReservation = async (req, res) => {
  var email = req.body.user.email;
  var depId = req.body.departureFlight._id;
  var retId = req.body.returnFlight._id;
  var depCabin = req.body.departureFlight.cabin;
  var retCabin = req.body.returnFlight.cabin;
  var depChosenSeats = req.body.departureFlight.chosenSeats;
  var retChosenSeats = req.body.returnFlight.chosenSeats;

  await User.findOne({ email: email}).then((result) => {
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


**Installation**:
before you run the project you need to perform the npm install command in both the frontend and backend folders to install all needed modules.
you will also need to create a .env file in the backend folder  with these variabled:
URI=type the link to your mongoDB
EMAIL=type your email that would email the users with things
EMAIL_PASSWORD=type the password for the above email
JWT_SECRET=can be basically anything you want to hash the sign in token


**Tests**
1-Register as a New User
(Enter First name , last name , email,username, password,passport number,address,country code put all the values as a new User entity in Database)
const createUser = async (req, res) => {
  const user = req.body.user;
  console.log(req.body.user);
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

2-search for a flight:
(Enter some flight criteria , reutrns flights matching the criteria and fully detailed)
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

3-edit user info:
(change any criteria related to User(except password) and relfects the changes in the database)
const updateExistingUser = (req, res) => {
  var email = req.params.email;

  User.findOne({ email: email }).then((result) => {
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




**How to Use?**:
after installing and configuring the files in the installation section, you need to run both the frontend and the backend folder.
run the backend folder with the command node app
run the frrontend folder witb the command npm run start
then the website will open on your browser. you will see the home page of our website and you can search for the dates and destinations and navigate smoothly through the website and perform the different features of our website like reserving a flight and choose its seats or login and edit your information


**Credits**:
some useful links:
React Crash Course:https://www.youtube.com/watch?v=w7ejDZ8SWv8
jwt authentication:https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57
mern repository:https://github.com/beaucarnes/mern-exercise-tracker-mongodb





 










































 