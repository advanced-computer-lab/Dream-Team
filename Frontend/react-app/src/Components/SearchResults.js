import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@mui/material/Button";

const SearchResults = () => {
  const location = useLocation();

  const url = "http://localhost:8000/flights/search" + location.search;
  console.log(url)
  
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    
    axios.get(url).then((result) => {
      setFlights(result.data);
    });
  }, [url]);

  return (
    <div>
      <ul>
        {flights.map((flight) => (
          <li key={flight._id}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <p className="left-txt">
                  {" "}
                  <Typography>
                    <b>Flight Number: </b> {flight.flight_number}{" "}
                    <p className="left-txt">
                      {" "}
                      <br />
                      <b> From: </b> {flight.from} {flight.departure_time}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>To: </b> {flight.from} {flight.arrival_time}{" "}
                    </p>
                    <p className="left-txt">
                      {" "}
                      <b>Price: </b> {flight.price}{" "}
                    </p>
                  </Typography>
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p className="left-txt">
                    {" "}
                    <b>Flight Date: </b> {flight.flight_date}{" "}
                  </p>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
