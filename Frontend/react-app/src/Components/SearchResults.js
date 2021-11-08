import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const SearchResults = () => {
  const location = useLocation();
  console.log(location.search);
  const url = "http://localhost:8000/flights/search" + location.search;
  console.log(url);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get(url).then((result) => {
      setFlights(result.data);
    });
  }, []);

  return <div><ul>
  {flights.map((flight) => (
    <li key={flight._id}>
      <div className="row">
        <p className="left-txt">
          {" "}
          <b>Flight Number: </b> {flight.flight_number}{" "}
        </p>
        <p className="left-txt">
          {" "}
          <b>Flight Date: </b> {flight.flight_date}{" "}
        </p>
        <p className="left-txt">
          {" "}
          <b>From: </b> {flight.from}{" "}
        </p>
        <p className="left-txt">
          {" "}
          <b>To: </b> {flight.to}{" "}
        </p>
        <p className="left-txt">
          {" "}
          <b>Departure Time: </b> {flight.departure_time}{" "}
        </p>
        <p className="left-txt">
          {" "}
          <b>Arrival Time: </b> {flight.arrival_time}{" "}
        </p>
        <p className="left-txt">
          {" "}
          <b>Economy: </b> {flight.economy_seats_available}{" "}
        </p>
        <p className="left-txt">
          {" "}
          <b>Business: </b> {flight.business_seats_available}
        </p>
      </div>
    </li>
  ))}
</ul></div>;
};

export default SearchResults;
