import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@mui/material/Button';

const UserSearchFlights = (props) => {
  
  

  const departureSearch = props.location.state.departureFlight;
  const returnSearch = props.location.state.returnFlight;
  

  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);

  useEffect(() => {
    console.log(departureSearch);
    axios.get("http://localhost:8000/user/search",departureSearch).then((result) => {
      setDepartureFlights(result.data);
      console.log(result.data);
    });
    axios.get("http://localhost:8000/user/search",returnSearch).then((result) => {
      setReturnFlights(result.data);
      console.log(result.data);
    });

  }, []);

  return (
    
    <div>
      

      <ul>
      <h3>Departure Flights</h3>
        {departureFlights.map((flight) => (
          
          <li key={flight._id}>
            <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            
              <p className="left-txt">
                {" "}
                <Typography>
                <p className="left-txt">
                {" "}
                <b>Flight Date: </b> {flight.flight_date}{" "}
              </p>
                
                
                <p className="left-txt">
                {" "}
                <br/>
                <b> From: </b> {flight.from } {flight.departure_time}{" "}
              </p>
              <p className="left-txt">
                {" "}
                <b>To: </b> {flight.from } {flight.arrival_time}{" "}
              </p>
                
              <p className="left-txt">
                {" "}
                <b>Price: </b> {flight.price_economy}{" "}
              </p>
                </Typography>
              </p>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>

            <b>Flight Number: </b> {flight.flight_number}{" "}
            
              <p className="left-txt">
                {" "}
                <b>Economy: </b> {flight.economy_seats_available}{" "}
              </p>
              <p className="left-txt">
                {" "}
                <b>Business: </b> {flight.business_seats_available}
              </p>
              
            </Typography>
            </AccordionDetails>
            </Accordion>
            <Button variant="contained">Book Flight</Button>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default UserSearchFlights;
