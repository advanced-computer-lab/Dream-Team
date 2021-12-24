
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@mui/material/Button';
    
    
    const SearchEditedFlights = (props) => {
      let cabin=true;
      
      
      const history=useHistory();
      const user=JSON.parse(localStorage.getItem("profile")).user
      const flightSearch = props.location.state.flight;
      const oldPrice = props.location.state.oldPrice;
      flightSearch.cabin === "business"? cabin =true:cabin =false;
    
      const [flights, setFlights] = useState([]);
      const [chosenFlight, setChosenFlight] = useState({});
      const [selectedFlightId, setSelectedFlightId] = useState("");
   
    
    
      useEffect(() => {
        console.log(flightSearch);
        axios.post("http://localhost:8000/user/search",flightSearch).then((result) => {
          setFlights(result.data);
         
        });
      }, []);
    
      const handleFlight = (flight) => {
        console.log(typeof flight._id);
        cabin? flight={...flight,cabin:"business",price:flight.price_business} : flight={...flight,cabin:"economy",price:flight.price_economy}
        setSelectedFlightId((prev)=>prev===flight._id?"":flight._id);
        setChosenFlight((prev)=>prev!=={...flight,passengers:flightSearch.passengers}?{...flight,passengers:flightSearch.passengers}:{});
        console.log(flight)
      };
      
      const handleProceed = () => {
        if(selectedFlightId===""){
          alert("please select a flight")
    
        }else{
          if(window.confirm("Are you sure you want to replace the flight?")){
              history.push("/new_seats",{...props.location.state,newFlight:chosenFlight})
          }
         
        }
      }
      return (
        
        <div>
          
    
          <ul>
          <h3>Available Flights</h3>
            {flights.map((flight) => (
              
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
                    
                    <b> Flight Date: </b> {flight.flight_date}{" "}
                  </p>
                    
                    <p className="left-txt">
                    {" "}
                    
                    <b> From: </b> {flight.from } {flight.departure_time}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>To: </b> {flight.to } {flight.arrival_time}{" "}
                  </p>
                    
                  <p className="left-txt">
                    {" "}
                    <b>Price Difference: </b> {cabin ? (flight.price_business-oldPrice) : (flight.price_economy-oldPrice)}
                  </p>
                    </Typography>
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                <p className="left-txt">
                    {" "}
                    <b>Flight Number: </b> {flight.flight_number}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>Baggage Allowance: </b> {flight.baggage_allowance}{" "}
                  </p>
                  <p className="left-txt">
                    {" "}
                    <b>Duration: </b> {flight.duration}
                  </p>
                </Typography>
                </AccordionDetails>
                </Accordion>
                <Button style={{backgroundColor:selectedFlightId===flight._id?"#519259":"#344CB7"}} variant="contained" onClick={() => {handleFlight(flight)}}>
                  {selectedFlightId===flight._id? "Selected":"Book Flight"}</Button>
    
              </li>
              
            ))}
          </ul>

          <Button variant="contained" onClick={() => {handleProceed()}}>Proceed</Button>
    
        </div>
      );
    };
    


export default SearchEditedFlights
