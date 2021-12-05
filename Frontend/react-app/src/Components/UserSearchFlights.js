import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@mui/material/Button';


const UserSearchFlights = (props) => {
  let cabin=true;
  
  
  const history=useHistory();

  const departureSearch = props.location.state.departureFlight;
  const returnSearch = props.location.state.returnFlight;
  departureSearch.cabin === "business"? cabin =true:cabin =false;

  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);

  const [chosenDeparture, setChosenDeparture] = useState({});
  const [chosenReturn, setChosenReturn] = useState({});

  const [selectedDepId, setSelectedDepId] = useState("");
  const [selectedRetId, setSelectedRetId] = useState("");


  useEffect(() => {
    console.log(departureSearch);
    axios.post("http://localhost:8000/user/search",departureSearch).then((result) => {
      setDepartureFlights(result.data);
     
    });
    axios.post("http://localhost:8000/user/search",returnSearch).then((result) => {
      setReturnFlights(result.data);
    });


  }, []);

  const handleDeparture = (flight) => {
    console.log(typeof flight._id);
    cabin? flight={...flight,cabin:"business",price:flight.price_business} : flight={...flight,cabin:"economy",price:flight.price_economy}
    setSelectedDepId((prev)=>prev===flight._id?"":flight._id);
    setChosenDeparture((prev)=>prev!=={...flight,passengers:departureSearch.passengers}?{...flight,passengers:departureSearch.passengers}:{});
    console.log(flight)
  };
  const handleReturn = (flight) => {
    cabin? flight={...flight,cabin:"business",price:flight.price_business}:flight={...flight,cabin:"economy",price:flight.price_economy}
    
    setSelectedRetId((prev)=>prev===flight._id?"":flight._id);
    setChosenReturn((prev)=>prev!=={...flight,passengers:departureSearch.passengers}?{...flight,passengers:departureSearch.passengers}:{});
    console.log(flight)

  };
  const handleProceed = () => {
    console.log(chosenDeparture);
    console.log(chosenReturn);
    if(selectedDepId===""||selectedRetId===""){
      alert("please select both")

    }else{
      
      history.push ("/summary", {...props.location.state,
        departureFlight: chosenDeparture,
        returnFlight: chosenReturn,
      })
    }
  }
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
                <b>Price: </b> {cabin ? flight.price_business : flight.price_economy}
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
            <Button style={{backgroundColor:selectedDepId===flight._id?"#519259":"#344CB7"}} variant="contained" onClick={() => {handleDeparture(flight)}}>
              {selectedDepId===flight._id? "Selected":"Book Flight"}</Button>

          </li>
          
        ))}
      </ul>
    

      <ul>
      <h3>Return Flights</h3>
        {returnFlights.map((flight) => (
          
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
              <b>Price: </b> {cabin ? flight.price_business : flight.price_economy}
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
          <Button style={{backgroundColor:selectedRetId===flight._id?"#519259":"#344CB7"}} variant="contained" onClick={() => {handleReturn(flight)}}>
            {selectedRetId===flight._id? "Selected":"Book Flight"}</Button>

        </li>
          
        ))}
      </ul>
      <Button variant="contained" onClick={() => {handleProceed()}}>Proceed</Button>

    </div>
  );
};

export default UserSearchFlights;
