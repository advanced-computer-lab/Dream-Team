import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";

// import "bootstrap/dist/css/bootstrap.min.css";

const CreateFlight = () => {
  const history = useHistory();
  const [flight, setFlight] = useState({});

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/flights/create", flight)
      .then(() => history.push("/"));
  };

  return (
    <div>
      <h3>Create Flight</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Flight Number: </label>
          <input
            type="text"
            className="form-control"
            name="flight_number"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <div>
            <TextField
              name="flight_date"
              onChange={handleChange}
              variant="outlined"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <br />

        <div className="form-group">
          <label>From: </label>
          <input
            type="text"
            className="form-control"
            name="from"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>To: </label>
          <input
            type="text"
            className="form-control"
            name="to"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Departure Time: </label>
          <input
            type="text"
            className="form-control"
            name="departure_time"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Arrival Time: </label>
          <input
            type="text"
            className="form-control"
            name="arrival_time"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Economy Seats: </label>
          <input
            type="text"
            className="form-control"
            name="economy_seats_available"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Business Seats: </label>
          <input
            type="text"
            className="form-control"
            name="business_seats_available"
            onChange={handleChange}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Create Flight"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateFlight;
