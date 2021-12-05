import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@mui/material/Button";

const SummaryOfReservation = (props) => {
  const history = useHistory();
  const departureFlight = props.location.state.departureFlight;
  const returnFlight = props.location.state.returnFlight;

  const onProceed = () => {
    if (props.location.state.hasOwnProperty("user")) {
      history.push("/seats_departure", props.location.state);
    } else {
      history.push("/login", props.location.state);
    }
  };

  return (
    <div>
      <ul>
        <h3>Summary of the reservation: 

        </h3>
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
                  
                  <p className="left-txt">
                  <b>From: </b> {departureFlight.from}{" "}
                    {" "}
                    <br/>
                    <b> Departure Time: </b> {departureFlight.departure_time}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>To: </b> {departureFlight.to}{" "}
                    <p className="left-txt">
                    {" "}
                    <b>Arrival Time: </b> {departureFlight.arrival_time}{" "}
                  </p>
                  </p>
                  
                  
                </Typography>
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p className="left-txt">
                  {" "}
                  <b>Flight Date: </b> {departureFlight.flight_date}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Cabin Class: </b> {departureFlight.cabin}{" "}
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
                    <b>Total Price: </b>{" "}
                    {departureFlight.price * +departureFlight.passengers}{" "}
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
                  
                  <p className="left-txt">
                  <b>From: </b> {returnFlight.from}{" "}
                    {" "}
                    <br />
                    <b> Departure Time: </b> {returnFlight.departure_time}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>To: </b> {returnFlight.to}{" "}
                    <p className="left-txt">
                    {" "}
                    <b>Arrival Time: </b> {returnFlight.arrival_time}{" "}
                  </p>
                  </p>
                  
                  
                </Typography>
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p className="left-txt">
                  {" "}
                  <b>Flight Date: </b> {returnFlight.flight_date}{" "}
                </p>
                <p className="left-txt">
                  {" "}
                  <b>Cabin Class: </b> {returnFlight.cabin}{" "}
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
                    <b>Total Price: </b>{" "}
                    {returnFlight.price * +returnFlight.passengers}
                  </p>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </li>
      </ul>

      <p className="left-txt">
        {" "}
        <b>Total Price: </b>{" "}
        {returnFlight.price * +returnFlight.passengers +
          departureFlight.price * +departureFlight.passengers}{" "}
      </p>

      <Button variant="contained" onClick={() => onProceed()}>
        Choose Seats
      </Button>
    </div>
  );
};

export default SummaryOfReservation;
