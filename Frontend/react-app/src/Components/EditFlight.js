import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { TextField } from "@material-ui/core";
import moment from 'moment'

import "bootstrap/dist/css/bootstrap.min.css";

const EditFlight = () => {
  const [flight, setFlight] = useState({});
  const { id } = useParams();
  const history=useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/flights/" + id)
      .then((response) => {
        setFlight({
          _id: response.data._id,
          flight_number: response.data.flight_number,
          flight_date: response.data.flight_date,
          from: response.data.from,
          to: response.data.to,
          departure_time: response.data.departure_time,
          arrival_time: response.data.arrival_time,
          economy_seats_available: response.data.economy_seats_available,
          business_seats_available: response.data.business_seats_available,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8000/flights/update/" + id, flight)
      .then(()=>{ alert("Flight Edited Successfully")
        history.push('/admin_home')});
  };

  return flight?._id ? (
    <div>
      <h3>Edit Flight Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Flight Number: </label>
          <input
            type="text"
            className="form-control"
            name="flight_number"
            value={flight.flight_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Flight Date: </label>
          <div>
            <TextField
              name="flight_date"
              value={moment(flight.flight_date).format('YYYY-MM-DD')}
              onChange={handleChange}
              variant="outlined"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>

        <div className="form-group">
          <label>From: </label>
          <input
            type="text"
            className="form-control"
            name="from"
            value={flight.from}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>To: </label>
          <input
            type="text"
            className="form-control"
            name="to"
            value={flight.to}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Departure Time: </label>
          <input
            type="text"
            className="form-control"
            name="departure_time"
            value={flight.departure_time}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Arrival Time: </label>
          <input
            type="text"
            className="form-control"
            name="arrival_time"
            value={flight.arrival_time}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Economy Seats: </label>
          <input
            type="text"
            className="form-control"
            name="economy_seats_available"
            value={flight.economy_seats_available}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Business: </label>
          <input
            type="text"
            className="form-control"
            name="business_seats_available"
            value={flight.business_seats_available}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Flight Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  ) : null;
};

export default EditFlight;
