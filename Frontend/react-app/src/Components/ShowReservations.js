import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@mui/material/Button";

const ShowReservations = (props) => {

  const [deleted, setDeleted] = useState(false);
  const [user, setUser] = useState({});
  const email = JSON.parse(localStorage.getItem("profile")).user.email;
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  //   console.log( props.location.state);
  //   console.log( reservations);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/" + email)
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setReservations(response.data.reservations);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (deleted) {
      setDeleted(false);
    }
  }, [deleted,email]);


  const onCancel = (user, id) => {
    if (
      window.confirm(
        "Cancel Reservation? If you cancel the reservation an email will be sent momentarily with the amount to be refunded. "
      )
    ) {
      const path =
        "http://localhost:8000/user/delete_reservation/" +
        user.email +
        "/" +
        id;
      const chosenReservation = reservations.find(
        (reservation) => reservation._id === id
      );
      const price =
        chosenReservation.departure_flight.price *
          Number(chosenReservation.departure_flight.passengers) +
        chosenReservation.return_flight.price *
          Number(chosenReservation.return_flight.passengers);

      axios.put(path, {
        departureFlight: chosenReservation.departure_flight,
        returnFlight: chosenReservation.return_flight,
      });
      setReservations(
        reservations.filter((reservation) => reservation._id !== id)
      );

      setDeleted(true);

      axios.post("http://localhost:8000/user/send_confirmation", {
        user,
        price,
        id,
      });
    }
  };
  const onEmail = (user, reservation) =>{
    axios.post("http://localhost:8000/user/send_itenerary", {
        user,
        reservation,
      });
  }
  const onClick = (flight, id, type) =>{
    history.push("/edit_flight_seat", {flight:flight, reservationID:id, type:type})
  }
  const onHome = (email, id) => {
    history.push("/user_home", {
      user: { ...user, reservations: reservations },
    });
  };
  const onChange=(oldPrice,from, to, rid, type)=>{
    history.push("/change_flight", {oldPrice:oldPrice,from:from, to:to, reservationID:rid, type:type})
  }

  return user?._id ?(
    <div>
      <ul>
      <Button
          variant="contained"
          onClick={() => {
            onHome();
          }}
        >
          Home
        </Button>
        <Typography variant="h4">My Reservations</Typography>
      
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            <h3>Reservation Number: {reservation._id}</h3>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <p className="left-txt">
                  {" "}
                  <Typography>
                    <h3>Departure Flight:</h3>

                    <p className="left-txt">
                      {" "}
                      <br />
                      <b> Flight Number: </b>{" "}
                      {reservation.departure_flight.flight_number}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Date: </b> {reservation.departure_flight.flight_date}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>From: </b>
                      {reservation.departure_flight.from}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>To: </b> {reservation.departure_flight.to}{" "}
                    </p>

                    <p className="left-txt">
                      {" "}
                      <b>Departure Time: </b>{" "}
                      {reservation.departure_flight.departure_time}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Arrival Time: </b>{" "}
                      {reservation.departure_flight.arrival_time}{" "}
                    </p>
                  </Typography>
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p className="left-txt">
                    {" "}
                    <b>Number of Passengers: </b>{" "}
                    {reservation.departure_flight.passengers}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>Cabin: </b> {reservation.departure_flight.cabin}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>Booked Seats: </b>{" "}
                    {reservation.departure_flight.chosenSeats.map(
                      (seat) => seat.seatNo + ", "
                    )}{" "}
                  </p>
                  <Button variant="contained" onClick={() => {onClick(reservation.departure_flight, reservation._id, "departure");}}>Change Seat</Button>
                  <Button variant="contained" onClick={() => {onChange(reservation.departure_flight.price,reservation.departure_flight.from, reservation.departure_flight.to, reservation._id, "departure");}}>Change Flight</Button>

                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <p className="left-txt">
                  {" "}
                  <Typography>
                    <h3>Return Flight:</h3>

                    <p className="left-txt">
                      {" "}
                      <br />
                      <b> Flight Number: </b>{" "}
                      {reservation.return_flight.flight_number}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Date: </b> {reservation.return_flight.flight_date}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>From: </b>
                      {reservation.return_flight.from}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>To: </b> {reservation.return_flight.to}{" "}
                    </p>

                    <p className="left-txt">
                      {" "}
                      <b>Departure Time: </b>{" "}
                      {reservation.return_flight.departure_time}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Arrival Time: </b>{" "}
                      {reservation.return_flight.arrival_time}{" "}
                    </p>
                  </Typography>
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p className="left-txt">
                    {" "}
                    <b>Number of Passengers: </b>{" "}
                    {reservation.return_flight.passengers}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>Cabin: </b> {reservation.return_flight.cabin}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>Booked Seats: </b>{" "}
                    {reservation.return_flight.chosenSeats.map(
                      (seat) => seat.seatNo + ", "
                    )}{" "}
                  </p>
                  <Button variant="contained" onClick={() => {onClick(reservation.return_flight, reservation._id, "return");}}>Change Seat</Button>
                  <Button variant="contained" onClick={() => {onChange(reservation.departure_flight.price,reservation.return_flight.from, reservation.return_flight.to, reservation._id, "return");}}>Change Flight</Button>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Button
              variant="contained"
              onClick={() => {
                onCancel(user, reservation._id);
              }}
            >
              Cancel Reservation
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onEmail(user, reservation);
              }}
            >
              Email Reservation
            </Button>
          </li>
        ))}
      </ul>
    </div>
  ):null;
};

export default ShowReservations;
