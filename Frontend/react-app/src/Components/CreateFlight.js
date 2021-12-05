import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";

//import "bootstrap/dist/css/bootstrap.min.css";


const CreateFlight = () => {
  const history = useHistory();
  const [flight, setFlight] = useState({});
  const businessSeats=+flight.business_seats_available;
  const economySeats=+flight.economy_seats_available;
  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let seatsA=[];
    for (let i=1;i<=businessSeats;i++){
      const seat={
        seatNo:i,
        reserved:false,
        cabin:"business"
      }
      seatsA.push(seat);
    }
    for (let i=businessSeats+1;i<=businessSeats+economySeats;i++){
      const seat={
        seatNo:i,
        reserved:false,
        cabin:"economy"
      }
      seatsA.push(seat);
    }
    const flightBody = {
      flight: {...flight,seats:seatsA}
    };
    console.log(seatsA);
    axios
    .post("http://localhost:8000/flights/create", flightBody)
    .then(() =>{alert("Flight Created Successfully");
      history.push("/admin_home");} );
  };

  return (
    <div>
      <h3>Create Flight</h3>
      <br />

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <TextField
            required
            name="flight_number"
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
            name="from"
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
            name="to"
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
            name="departure_time"
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
            name="arrival_time"
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
            type="number"
            name="price_business"
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
            type="number"
            name="price_economy"
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
            type="number"
            name="economy_seats_available"
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
            type="number"
            name="business_seats_available"
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
            name="departure_terminal"
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
            name="arrival_terminal"
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
            name="baggage_allowance"
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
          <TextField
            required
            name="duration"
            id="outlined-required"
            label="Duration"
            onChange={handleChange}
            variant="outlined"
            //InputLabelProps={{ shrink: true }}
          />
        </div>

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
