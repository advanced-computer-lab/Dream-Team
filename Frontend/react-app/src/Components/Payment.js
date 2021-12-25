    import {CircularProgress,Container, Grid, MenuItem, Select, TextField, Typography, FormControl, Box, Button, Divider} from "@material-ui/core";
    import React, { useState } from "react";
    import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
    import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
    import moment from "moment";
    import getTimeDifference from "../../utils/time";
    import { useHistory } from "react-router";
    import StripeCheckout from "react-stripe-checkout";
    import { editFlight } from "../../api/flight";
    import { createReservation } from "../../api/reservation";
    import { pay } from "../../api/payment";
    
    const Payment = (props) => {
    const details = props?.location?.state;
    const history = useHistory();
    const {
    departingFlight,
    returnFlight,
    departingFlightSeats,
    returnFlightSeats,
    passengers,
    passengersInfo,
    cabin,
    userId,
    } = details;
    
    const departureSeatsAvailable = departingFlightSeats;
    const totalPrice =
    cabin === "Business"
    ? passengers *
    (departingFlight.businessPrice + returnFlight.businessPrice)
    : passengers * (departingFlight.economyPrice + returnFlight.economyPrice);
    const returnSeatsAvailable = returnFlightSeats;
    const [passengerInfoState, setPassengerInfoState] = useState(passengersInfo);
    const [selectedDepartureSeats, setSelectedDepartureSeats] = useState([]);
    const [selectedReturnSeats, setSelectedReturnSeats] = useState([]);
    const noOfPassengersArray = [...Array(Number(passengers)).keys()];
    let chargeId;
    const handleResetSeatClick = () => {
    setPassengerInfoState((passenger) =>
    passenger.map((passengerInfo) => ({
    ...passengerInfo,
    departureSeat: {},
    returnSeat: {},
    }))
    );
    setSelectedDepartureSeats([]);
    setSelectedReturnSeats([]);
    };
    
    const handleChange = (e, i) => {
    setPassengerInfoState((passenger) =>
    passenger.map((info, index) =>
    index === i ? { ...info, [e.target.name]: e.target.value } : info
    )
    );
    if (e.target.name === "departureSeat" || e.target.name === "returnSeat") {
    if (e.target.name === "departureSeat") {
    setSelectedDepartureSeats((prevSelectedDepartureSeats) =>
    prevSelectedDepartureSeats.length === 0
    ? [
    ...prevSelectedDepartureSeats,
    { ...e.target.value, forPassenger: i },
    ]
    : [
    ...prevSelectedDepartureSeats.filter(
    (departureSeat) => departureSeat.forPassenger !== i
    ),
    { ...e.target.value, forPassenger: i },
    ]
    );
    } else if (e.target.name === "returnSeat") {
    setSelectedReturnSeats((prevSelectedReturnSeats) =>
    prevSelectedReturnSeats.length === 0
    ? [
    ...prevSelectedReturnSeats,
    { ...e.target.value, forPassenger: i },
    ]
    : [
    ...prevSelectedReturnSeats.filter(
    (returnSeat) => returnSeat.forPassenger !== i
    ),
    { ...e.target.value, forPassenger: i },
    ]
    );
    }
    }
    };
    
    const handleSubmit = async () => {
    const passengersWithoutReserved = passengerInfoState.map((passenger) => {
    delete passenger.departureSeat.reserved;
    delete passenger.returnSeat.reserved;
    return passenger;
    });
    const departureFlightBody =
    cabin === "Business"
    ? {
    flight: {
    _id: departingFlight._id,
    seats: departingFlight.seats,
    numberOfAvailableBusinessSeats:
    departingFlight.numberOfAvailableBusinessSeats - passengers,
    },
    }
    : {
    flight: {
    _id: departingFlight._id,
    seats: departingFlight.seats,
    numberOfAvailableEconomySeats:
    departingFlight.numberOfAvailableEconomySeats - passengers,
    },
    };
    
    const returnFlightBody =
    cabin === "Business"
    ? {
    flight: {
    _id: returnFlight._id,
    seats: returnFlight.seats,
    numberOfAvailableBusinessSeats:
    returnFlight.numberOfAvailableBusinessSeats - passengers,
    },
    }
    : {
    flight: {
    _id: returnFlight._id,
    seats: returnFlight.seats,
    numberOfAvailableEconomySeats:
    returnFlight.numberOfAvailableEconomySeats - passengers,
    },
    };
    
    const email = JSON.parse(localStorage.getItem("profile")).user.email;
    
    const reservation = {
    reservation: {
    userId,
    departingFlightId: departingFlight._id,
    returnFlightId: returnFlight._id,
    passengers: passengersWithoutReserved,
    class: cabin,
    status: "Reserved",
    totalPrice,
    email,
    chargeId,
    },
    };
    
    editFlight(departureFlightBody);
    editFlight(returnFlightBody);
    
    createReservation(reservation).then((res) => {
    history.push("/summary", {
    ...props.location.state,
    reservation: res.data.reservation,
    });
    });
    };
    const makePayment = async (token) => {
    const email = JSON.parse(localStorage.getItem("profile")).user.email;
    const body = {
    token,
    product: {
    price: totalPrice,
    },
    email,
    };
    
    return pay(body)
    .then((res) => {
    console.log(res.data.charge);
    chargeId = res.data.charge.id;
    handleSubmit();
    })
    .catch((err) => console.log(err));
    };
    
    return details && departureSeatsAvailable.length > 0 ? (
    <Container component="main" style={{ marginTop: "6rem" }}>
    <Grid container alignItems="stretch" spacing={3}>
    <Grid item xs={8}>
    <form onSubmit={handleSubmit}>
    <div style={{ display: "flex" }}>
    <Typography
    variant="body1"
    display="inline"
    style={{
    display: "flex",
    alignItems: "center",
    marginBottom: "2.2rem",
    }}
    >
    HNFEY • {departingFlight.from}{" "}
    <ArrowForwardIcon fontSize="small" /> {departingFlight.to}
    {" "}
    <ArrowForwardIosIcon fontSize="small" />
    {" "}HNFEY • {returnFlight.from}{" "}
    <ArrowForwardIcon fontSize="small" /> {returnFlight.to}
    <ArrowForwardIosIcon fontSize="small" />
    </Typography>
    <Typography style={{ fontWeight: 700 }}>Checkout</Typography>
    </div>
    <div
    style={{
    display: "flex",
    borderRadius: "10px",
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "2rem",
    }}
    >
    <div
    style={{
    display: "flex",
    flexDirection: "column",
    margin: "2rem",
    }}
    >
    <Typography
    variant="h2"
    style={{
    fontSize: "1.5rem",
    fontWeight: 500,
    marginBottom: "1rem",
    }}
    >
    Travelers Information
    </Typography>
    <Typography
    variant="body2"
    style={{ fontSize: "0.875rem", fontWeight: 300 }}
    >
    Traveler names must match government-issued photo ID exactly.
    </Typography>
    </div>
    {noOfPassengersArray.map((passenger, i) => {
    return (
    <div
    key={i}
    style={{
    margin: "2rem",
    marginBottom:
    i + 1 === noOfPassengersArray.length ? "3rem" : "1rem",
    display: "flex",
    flexDirection: "column",
    }}
    >
    <Typography
    variant="h5"
    style={{
    fontSize: "1rem",
    fontWeight: 500,
    marginBottom: "1rem",
    }}
    >
    Traveler {i + 1}: {i === 0 ? "primary contact" : ""}
    </Typography>
    <Grid container alignItems="stretch" spacing={3}>
    <Grid item xs={6}>
    <Typography
    variant="h5"
    style={{
    fontSize: "0.875rem",
    fontWeight: 400,
    marginBottom: "0.5rem",
    }}
    >
    First Name:
    </Typography>
    <TextField
    name="firstName"
    onChange={(e) => handleChange(e, i)}
    style={{ width: "12.5rem" }}
    variant="outlined"
    placeholder="John"
    type="text"
    required
    />
    </Grid>
    <Grid item xs={6}>
    <Typography
    variant="h5"
    style={{
    fontSize: "0.875rem",
    fontWeight: 400,
    marginBottom: "0.5rem",
    }}
    >
    Last Name:
    </Typography>
    <TextField
    name="lastName"
    onChange={(e) => handleChange(e, i)}
    style={{ width: "12.5rem" }}
    variant="outlined"
    placeholder="Doe"
    type="text"
    required
    />
    </Grid>
    
    <Grid item xs={6}>
    <Typography
    variant="h5"
    style={{
    fontSize: "0.875rem",
    fontWeight: 400,
    marginBottom: "0.5rem",
    }}
    >
    Departure Flight Seat:
    </Typography>
    <Box sx={{ width: "12.5rem" }}>
    <FormControl fullWidth>
    <Select
    required
    labelId="demo-simple-select-label"
    variant="outlined"
    id="demo-simple-select"
    name="departureSeat"
    value={
    passengerInfoState[i].departureSeat._id
    ? passengerInfoState[i].departureSeat
    : ""
    }
    onChange={(e) => handleChange(e, i)}
    >
    {departureSeatsAvailable.map((seat) => {
    return selectedDepartureSeats.includes({
    ...seat,
    forPassenger: i,
    }) ? (
    <MenuItem value={seat} key={seat._id}>
    {seat.seatNumber}
    </MenuItem>
    ) : selectedDepartureSeats.some(
    (depSeat) =>
    depSeat.seatNumber === seat.seatNumber
    ) ? (
    selectedDepartureSeats.some(
    (selectedDepartureSeat) =>
    selectedDepartureSeat.forPassenger !== i
    ) ? (
    <MenuItem
    disabled
    value={seat}
    key={seat._id}
    >
    {seat.seatNumber}
    </MenuItem>
    ) : (
    <MenuItem value={seat} key={seat._id}>
    {seat.seatNumber}
    </MenuItem>
    )
    ) : (
    <MenuItem value={seat} key={seat._id}>
    {seat.seatNumber}
    </MenuItem>
    );
    })}
    </Select>
    </FormControl>
    </Box>
    </Grid>
    <Grid item xs={6}>
    <Typography
    variant="h5"
    style={{
    fontSize: "0.875rem",
    fontWeight: 400,
    marginBottom: "0.5rem",
    }}
    >
    Return Flight Seat:
    </Typography>
    <Box sx={{ width: "12.5rem" }}>
    <FormControl fullWidth>
    <Select
    required
    labelId="demo-simple-select-label"
    variant="outlined"
    id="demo-simple-select"
    name="returnSeat"
    value={
    passengerInfoState[i].returnSeat._id
    ? passengerInfoState[i].returnSeat
    : ""
    }
    onChange={(e) => handleChange(e, i)}
    >
    {returnSeatsAvailable.map((seat) => {
    return selectedReturnSeats.includes({
    ...seat,
    forPassenger: i,
    }) ? (
    <MenuItem value={seat} key={seat._id}>
    {seat.seatNumber}
    </MenuItem>
    ) : selectedReturnSeats.some(
    (returnSeat) =>
    returnSeat.seatNumber === seat.seatNumber
    ) ? (
    selectedReturnSeats.some(
    (selectedReturnSeat) =>
    selectedReturnSeat.forPassenger !== i
    ) ? (
    <MenuItem
    disabled
    value={seat}
    key={seat._id}
    >
    {seat.seatNumber}
    </MenuItem>
    ) : (
    <MenuItem value={seat} key={seat._id}>
    {seat.seatNumber}
    </MenuItem>
    )
    ) : (
    <MenuItem value={seat} key={seat._id}>
    {seat.seatNumber}
    </MenuItem>
    );
    })}
    </Select>
    </FormControl>
    </Box>
    </Grid>
    <Grid item xs={6}>
    <Typography
    variant="h5"
    style={{
    fontSize: "0.875rem",
    fontWeight: 400,
    marginBottom: "0.5rem",
    }}
    >
    Passport Number:
    </Typography>
    <TextField
    name="passportNumber"
    onChange={(e) => handleChange(e, i)}
    style={{ width: "12.5rem" }}
    variant="outlined"
    placeholder="231606057"
    type="text"
    required
    />
    </Grid>
    </Grid>
    {noOfPassengersArray.length !== i + 1 ? (
    <Divider style={{ marginTop: "3rem" }} />
    ) : (
    <div style={{ marginTop: "2rem" }}>
    <Button
    variant="contained"
    color="primary"
    onClick={handleResetSeatClick}
    >
    Reset all seats
    </Button>
    </div>
    )}
    </div>
    );
    })}
    </div>
    <div
    style={{
    display: "flex",
    gap: "2rem",
    marginBottom: "4rem",
    }}
    >
    <StripeCheckout
    currency="EGP"
    stripeKey="pk_test_51K9Vp6DHyFDpcdiHt9NGEIZRJJMdtwrcGx1QuPZe5N0UhB9Kf3y1Y3oQfZWEXIwsv9mHLeHVqToil9P9giCviy9I00VR1fbDZ9"
    token={makePayment}
    name="Reserve Flight"
    amount={totalPrice * 100}
    >
    <Button
    variant="contained"
    style={{
    width: "inherit",
    background:
    "linear-gradient(to top,#FFBD24 0,#FFC94C 100%)",
    color: "#3d3100",
    fontSize: "1.2rem",
    }}
    color="primary"
    // type="submit"
    >
    Complete Booking <ArrowForwardIosIcon />
    </Button>
    </StripeCheckout>
    </div>
    </form>
    </Grid>
    
    <Grid item xs={4}>
    <div
    style={{
    display: "flex",
    borderRadius: "10px",
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "3.7rem",
    }}
    >
    <div
    style={{
    display: "flex",
    flexDirection: "column",
    margin: "2rem 1rem 1rem",
    }}
    >
    <Typography
    variant="h2"
    style={{
    fontSize: "1.5rem",
    fontWeight: 500,
    marginBottom: "0.3rem",
    }}
    >
    Roundtrip flight
    </Typography>
    <Typography
    variant="body2"
    style={{ fontSize: "0.875rem", fontWeight: 300 }}
    >
    {passengers} tickets: {passengers} travelers
    </Typography>
    <Divider style={{ marginTop: "1rem" }} />
    </div>
    <div
    style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    }}
    >
    <div
    style={{
    margin: "0rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    }}
    >
    <Typography
    variant="h6"
    style={{ fontSize: "0.875rem", fontWeight: 500 }}
    >
    {departingFlight.from} {"to"} {departingFlight.to}
    </Typography>
    <Typography
    display="inline"
    variant="body1"
    style={{
    fontSize: "0.875rem",
    fontWeight: 500,
    }}
    >
    {moment(departingFlight.departureDay).format("ddd, MMM Do")}
    </Typography>
    <div style={{ display: "flex", gap: "0.3rem" }}>
    <Typography
    variant="body1"
    style={{ fontSize: "0.875rem", fontWeight: 300 }}
    >
    {moment(departingFlight.departureDateTime).format(
    "hh:mm A"
    )}{" "}
    -{" "}
    {moment(departingFlight.arrivalDateTime).format("hh:mm A")}
    </Typography>
    <Typography
    variant="body1"
    style={{ fontSize: "0.875rem", fontWeight: 300 }}
    >
    {"("}
    {getTimeDifference(
    departingFlight.departureDateTime,
    departingFlight.arrivalDateTime
    )}
    {")"}
    </Typography>
    </div>
    </div>
    <div
    style={{
    margin: "0rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    }}
    >
    <Typography
    variant="h6"
    style={{ fontSize: "0.875rem", fontWeight: 500 }}
    >
    {returnFlight.from} {"to"} {returnFlight.to}
    </Typography>
    <Typography
    display="inline"
    variant="body1"
    style={{
    fontSize: "0.875rem",
    fontWeight: 500,
    }}
    >
    {moment(returnFlight.departureDay).format("ddd, MMM Do")}
    </Typography>
    <div style={{ display: "flex", gap: "0.3rem" }}>
    <Typography
    variant="body1"
    style={{ fontSize: "0.875rem", fontWeight: 300 }}
    >
    {moment(returnFlight.departureDateTime).format("hh:mm A")} -{" "}
    {moment(returnFlight.arrivalDateTime).format("hh:mm A")}
    </Typography>
    <Typography
    variant="body1"
    style={{ fontSize: "0.875rem", fontWeight: 300 }}
    >
    {"("}
    {getTimeDifference(
    returnFlight.departureDateTime,
    returnFlight.arrivalDateTime
    )}
    {")"}
    </Typography>
    </div>
    <Divider style={{ marginTop: "0.5rem" }} />
    </div>
    <div
    style={{
    margin: "0rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    }}
    >
    <Typography
    variant="body1"
    style={{ fontSize: "1rem", fontWeight: 500 }}
    >
    Your price summary
    </Typography>
    {noOfPassengersArray.map((passenger, i) => (
    <div key={i} style={{ display: "flex" }}>
    <Typography
    variant="body2"
    style={{
    fontSize: "0.875rem",
    fontWeight: 400,
    flexGrow: 1,
    }}
    >
    Traveler {i + 1} :
    </Typography>
    <Typography
    variant="body2"
    style={{
    fontSize: "0.875rem",
    fontWeight: 400,
    }}
    >
    EGP{" "}
    {cabin === "Business"
    ? departingFlight.businessPrice +
    returnFlight.businessPrice
    : departingFlight.economyPrice +
    returnFlight.economyPrice}
    </Typography>
    </div>
    ))}
    <Divider style={{ marginTop: "1rem" }} />
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Typography
    variant="body2"
    style={{ fontSize: "0.875rem", fontWeight: 500 }}
    >
    <span style={{ fontWeight: 300 }}>Total:</span> EGP{" "}
    {totalPrice}
    </Typography>
    </div>
    <div style={{ display: "flex", marginBottom: "2rem" }}>
    <Typography
    variant="body2"
    style={{ fontSize: "0.875rem", fontWeight: 500 }}
    >
    <span style={{ fontWeight: 300 }}>
    All prices are quoted in{" "}
    </span>{" "}
    EGP.
    </Typography>
    </div>
    </div>
    </div>
    </div>
    </Grid>
    </Grid>
    </Container>
    ) : (
    <Container component="main">
    <div
    style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    }}
    >
    <CircularProgress color="secondary" />
    </div>
    </Container>
    );
    };
    
    export default Payment;