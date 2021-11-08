import React, { useState } from "react";

import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const SearchFlights = () => {
  const history = useHistory();

  const [flight, setFlight] = useState({});

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let searchUrl = "/search/results?";
    const noOfKeys = Object.keys(flight).length;
    Object.entries(flight).map((entry, i) => {
      let [key, value] = entry;
      let last = i + 1 === noOfKeys ? "" : "&";
      return (searchUrl += key + "=" + value + last);
    });

    history.push(searchUrl);
  };

  return (
    <div>
      <h3>Search Flights</h3>
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
          <input
            type="submit"
            value="Search Flights"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchFlights;
