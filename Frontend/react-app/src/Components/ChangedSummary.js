
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@mui/material/Button";
const ChangedSummary = (props) => {
    const user=JSON.parse(localStorage.getItem("profile")).user
    const oldPrice = props.location.state.oldPrice;

      const history = useHistory();
      const newFlight = props.location.state.newFlight;
      
    
      const onProceed = () => {
       
          axios
            .put(
              "http://localhost:8000/user/edit_reservation",{
                  ...props.location.state,user:user
              }
              
            )
            .then(() => {
              alert("Reservation Changed. ");
              history.push("/user_reservations");
            });
        
      };
    
      return (
        <div>
          <ul>
            <h3>Itinerary of the Reservation:</h3>
            <h3>New Flight</h3>
    
            <li key={newFlight._id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="left-txt">
                    {" "}
                    <Typography>
                      <b>From: </b> {newFlight.from}{" "}
                      <p className="left-txt">
                        {" "}
                        <b>Departure Time: </b> {newFlight.departure_time}{" "}
                      </p>
                      <p className="left-txt">
                        {" "}
                        <b>To: </b> {newFlight.to}{" "}
                        <p className="left-txt">
                          {" "}
                          <b> Arrival Time: </b> {newFlight.arrival_time}{" "}
                        </p>
                      </p>
                      <p className="left-txt">
                        {" "}
                        <b>Total Price: </b>{" "}
                        {newFlight.price * newFlight.chosenSeats.length}{" "}
                      </p>
                      
                        <p className="left-txt">
                          {" "}
                          <b> Price Difference: </b> {newFlight.price -oldPrice}{" "}
                        </p>
                    </Typography>
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p className="left-txt">
                      {" "}
                      <b>Flight Number: </b> {newFlight.flight_number}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Flight Date: </b> {newFlight.flight_date}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Price per seat: </b> {newFlight.price}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Total Number of Seats: </b> {newFlight.passengers}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Booked Seats: </b>{" "}
                      {newFlight.chosenSeats.map(
                        (seat) => seat.seatNo + ", "
                      )}{" "}
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </li>
          </ul>
    
    
          <Button variant="contained" onClick={() => onProceed()}>
            Confirm Reservation
          </Button>
        </div>
      );
    
}

export default ChangedSummary
