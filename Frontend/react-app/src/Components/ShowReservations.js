import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@mui/material/Button';




const ShowReservations = (props) => {
    const history=useHistory();
    const [user, setUser] = useState(
        props.location.state.user
      );


    const onProceed = () => {
        history.push("/user_reservations", props.location.state)
    };
    

    return (
        <div>
            <ul>
      <h3>Departure Flight</h3>
        
      {user.reservations.map((reservation) => (
          <li key={reservation.departure_flight._id}>
            <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            
              <p className="left-txt">
                {" "}
                <Typography>
                <b>From: </b> {reservation.departure_flight.from}{" "}
                
                <p className="left-txt">
                {" "}
                <br/>
                <b> Departure Time: </b> {reservation.departure_flight.departure_time } {" "}
              </p>
              <p className="left-txt">
                {" "}
                <b>To: </b> {reservation.departure_flight.to } {" "}
              </p>
              <p className="left-txt">
                {" "}
                <b>Arrival Time: </b> {reservation.departure_flight.arrival_time } {" "}
              </p>
                
              <p className="left-txt">
                {" "}
                <b>Price: </b> {reservation.departure_flight.price * (+reservation.departure_flight.passengers)} {" "}
              </p>
                </Typography>
              </p>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              <p className="left-txt">
                {" "}
                <b>Flight Date: </b> {reservation.departure_flight.flight_date}{" "}
              </p>
              <p className="left-txt">
                {" "}
                <b>Booked Seats: </b> {reservation.departure_flight.chosenSeats.map((seat)=> (seat.seatNo + ", "))} {" "}
              </p>
            </Typography>
            </AccordionDetails>
            </Accordion>
            

          </li>
      ))}
        



      <h3>Return Flight</h3>
        
      {user.reservations.map((reservation) => (
          <li key={reservation.return_flight._id}>
            <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            
              <p className="left-txt">
                {" "}
                <Typography>
                <b>From: </b> {reservation.return_flight.from}{" "}
                
                <p className="left-txt">
                {" "}
                <br/>
                <b> Departure Time: </b> {reservation.return_flight.departure_time } {" "}
              </p>
              <p className="left-txt">
                {" "}
                <b>To: </b> {reservation.return_flight.to } {" "}
              </p>
              <p className="left-txt">
                {" "}
                <b>Arrival Time: </b> {reservation.return_flight.arrival_time } {" "}
              </p>
                
              <p className="left-txt">
                {" "}
                <b>Price: </b> {reservation.return_flight.price* (+reservation.return_flight.passengers)}
              </p>
                </Typography>
              </p>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            <p className="left-txt">
                {" "}
                <b>Flight Date: </b> {reservation.return_flight.flight_date}{" "}
              </p>
              <p className="left-txt">
                {" "}
                <b>Booked Seats: </b> {reservation.return_flight.chosenSeats.map((seat)=> (seat.seatNo + ", "))} {" "}
              </p>
            </Typography>
            </AccordionDetails>
            </Accordion>
            
            <Button variant="contained" >Cancel Booking</Button>
          </li>
          
      ))}
      </ul>

      

        </div>
    )
}

export default ShowReservations

