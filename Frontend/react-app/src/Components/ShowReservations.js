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
  
  const history = useHistory();
  const [deleted, setDeleted] = useState(false);
  const [user, setUser] = useState(props.location.state.user);
  const [reservations, setReservations] = useState(props.location.state.user.reservations);
//   console.log( props.location.state);
//   console.log( reservations);



  useEffect(() => {

    // setReservations(user.reservations);
    if(deleted){
        setDeleted(false)
    }
    
  }, [deleted]);
console.log(props.location.state);


  const onCancel = (user,id) => {
    if (window.confirm("Delete?")) {
      const path = "http://localhost:8000/user/delete_reservation/" + user.email+"/"+id;
      const chosenReservation= reservations.find((reservation)=> reservation._id===id)
      const price=chosenReservation.departure_flight.price* Number(chosenReservation.departure_flight.passengers)+chosenReservation.return_flight.price* Number(chosenReservation.return_flight.passengers)

      axios.put(path,{departureFlight:chosenReservation.departure_flight,returnFlight:chosenReservation.return_flight});
      setReservations(reservations.filter((reservation)=> reservation._id!==id));

      setDeleted(true)

      axios.post("http://localhost:8000/user/send_confirmation",{user,price})
    }
  };
  const onHome = (email,id) => {

    history.push("/user_home",{user:{...user,reservations:reservations}});
  };

  return (
    <div>
      <ul>
        <h3>My Reservations</h3>
        <Button
              variant="contained"
              onClick={() => {
                onHome();
              }}
            >
              Home
            </Button>

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
                      <b>From:  </b>{reservation.departure_flight.from}{" "}
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
                      <b>From:  </b>{reservation.return_flight.from}{" "}
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
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Button
              variant="contained"
              onClick={() => {
                onCancel(user,reservation._id);
              }}
            >
              Cancel Reservation
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowReservations;
