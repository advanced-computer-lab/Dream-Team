import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@mui/material/Button";

const ConfirmReservation = (props) => {
  
  const history = useHistory();
  const user=JSON.parse(localStorage.getItem("profile")).user

  const departureFlight = props.location.state.departureFlight;
  const returnFlight = props.location.state.returnFlight;

  window.localStorage.setItem('reservationState', JSON.stringify(props.location.state))
  window.localStorage.setItem('departureFlight', JSON.stringify(departureFlight))
  window.localStorage.setItem('returnFlight', JSON.stringify(returnFlight))

  const totalPrice = returnFlight.price * +returnFlight.passengers +
          departureFlight.price * +departureFlight.passengers


  return (
    <div>
      <ul>
        <h3>Itinerary of the Reservation:</h3>
        <h3>Departure Flight</h3>

        <li key={departureFlight._id}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="left-txt">
                {" "}
                <Typography>
                  <b>From: </b> {departureFlight.from}{" "}
                  <p className="left-txt">
                    {" "}
                    <b>Departure Time: </b> {departureFlight.departure_time}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>To: </b> {departureFlight.to}{" "}
                    <p className="left-txt">
                      {" "}
                      <b> Arrival Time: </b> {departureFlight.arrival_time}{" "}
                    </p>
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>Total Price: </b>{" "}
                    {departureFlight.price * departureFlight.chosenSeats.length}{" "}
                  </p>
                </Typography>
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p className="left-txt">
                  {" "}
                  <b>Flight Number: </b> {departureFlight.flight_number}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Flight Date: </b> {departureFlight.flight_date}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Price per seat: </b> {departureFlight.price}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Total Number of Seats: </b> {departureFlight.passengers}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Booked Seats: </b>{" "}
                  {departureFlight.chosenSeats.map(
                    (seat) => seat.seatNo + ", "
                  )}{" "}
                </p>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </li>
      </ul>

      <ul>
        <h3>Return Flight</h3>

        <li key={returnFlight._id}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="left-txt">
                {" "}
                <Typography>
                  <b>From: </b> {returnFlight.from}{" "}
                  <p className="left-txt">
                    {" "}
                    <b>Departure Time: </b> {returnFlight.departure_time}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>To: </b> {returnFlight.to}{" "}
                    <p className="left-txt">
                      {" "}
                      <b> Arrival Time: </b> {returnFlight.arrival_time}{" "}
                    </p>
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>Total Price: </b>{" "}
                    {returnFlight.price * returnFlight.chosenSeats.length}
                  </p>
                </Typography>
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p className="left-txt">
                  {" "}
                  <b>Flight Number: </b> {returnFlight.flight_number}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Flight Date: </b> {returnFlight.flight_date}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Price per seat: </b> {returnFlight.price}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Total Number of Seats: </b> {returnFlight.passengers}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Booked Seats: </b>{" "}
                  {returnFlight.chosenSeats.map((seat) => seat.seatNo + ", ")}{" "}
                </p>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </li>
      </ul>

      <p className="left-txt">
        {" "}
        <b>Total Price: </b>{" "}
        {totalPrice}{" "}
      </p>
      <form method="POST" action="http://localhost:8000/payment/pay">
        <input type="hidden" name="totalPrice" value={totalPrice} />
        <input type="hidden" name="name" value={`${user.firstName} ${user.lastName}`} />
        <input type="hidden" name="email" value={user.email} />
        <Button type="submit" variant="contained">
          Confirm Reservation
        </Button>
      </form>

    </div>
  );
};

export default ConfirmReservation;
