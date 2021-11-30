import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";

import "bootstrap/dist/css/bootstrap.min.css";

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
      <br />

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <TextField
            required
            id="outlined-required"
            label="Flight Number"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
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
          
          <TextField
            required
            id="outlined-required"
            label="From"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
      
        <div className="form-group">
          
          <TextField
            required
            id="outlined-required"
            label="To"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
        <div className="form-group">
          
          <TextField
            required
            id="outlined-required"
            label="Departure Time"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
        <div className="form-group">
          
          <TextField
            required
            id="outlined-required"
            label="Arrival Time"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
        <div className="form-group">
       
          <TextField
            required
            id="outlined-required"
            label="Business Price"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
        <div className="form-group">
       
          <TextField
            required
            id="outlined-required"
            label="Economy Price"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
        <div className="form-group">
       
          <TextField
            required
            id="outlined-required"
            label="Economy Seats"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
        <div className="form-group">
          
          <TextField
            required
            id="outlined-required"
            label="Business Seats"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
        <div className="form-group">
       
          <TextField
            required
            id="outlined-required"
            label="Departure Terminal"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <br />
        <div className="form-group">
       
          <TextField
            required
            id="outlined-required"
            label="Arrival Terminal"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="form-group">
       
       <TextField
         required
         id="outlined-required"
         label="Baggage Allowance"
         onChange={handleChange}
         variant="outlined"
         //InputLabelProps={{ shrink: true }}
       />
     </div>
        <br />
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
