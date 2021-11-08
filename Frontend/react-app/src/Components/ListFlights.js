import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


const ListFlights = () => {
  let history = useHistory();
  const [flights, setFlights] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/flights").then((result) => {
      setFlights(result.data);
    });
    if(deleted){
        setDeleted(false)
    }
    
  }, [deleted]);

  const deleteFlight = (id) => {
    if (window.confirm("Delete?")) {
      const path = "http://localhost:8000/flights/delete/" + id;
      axios.delete(path);
      setFlights(flights.filter((flight)=> flight._id!==id));
      setDeleted(true)
    }
  };

  const editFlight = (id) => {
    history.push("/edit/" + id);
  };
  const createFlight = (id) => {
    history.push("/create");
  };
  const searchFlight = (id) => {
    history.push("/search");
  };

  return (
    <>
      <ul>
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
              <button onClick={() => editFlight(flight._id)}>Edit</button>
              <button onClick={() => deleteFlight(flight._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => createFlight()}>Create</button>
      <button onClick={() => searchFlight()}>Search</button>
    </>
  );
};
export default ListFlights;
