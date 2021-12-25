import React, { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/Menu";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import Select from "@mui/material/Select";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const HomePage = () => {
  const history = useHistory();

  const [departureFlight, setDepartureFlight] = useState({});
  const [returnFlight, setReturnFlight] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "departure_date") {
      setDepartureFlight({ ...departureFlight, flight_date: e.target.value });
    } else if (e.target.name === "return_date") {
      setReturnFlight({ ...returnFlight, flight_date: e.target.value });
    } else if (e.target.name === "from") {
      setDepartureFlight({ ...departureFlight, from: e.target.value });
      setReturnFlight({ ...returnFlight, to: e.target.value });
    } else if (e.target.name === "to") {
      setDepartureFlight({ ...departureFlight, to: e.target.value });
      setReturnFlight({ ...returnFlight, from: e.target.value });
    } else if (e.target.name === "adults" || e.target.name === "children") {
      if (departureFlight.hasOwnProperty("passengers")) {
        let i = departureFlight.passengers;
        setDepartureFlight({
          ...departureFlight,
          passengers: Number(i) + Number(e.target.value),
        });
        setReturnFlight({
          ...returnFlight,
          passengers: Number(i) + Number(e.target.value),
        });
      } else {
        setDepartureFlight({ ...departureFlight, passengers: e.target.value });
        setReturnFlight({ ...returnFlight, passengers: e.target.value });
      }
    } else {
      setDepartureFlight({
        ...departureFlight,
        [e.target.name]: e.target.value,
      });
      setReturnFlight({ ...returnFlight, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(departureFlight);
    console.log(returnFlight);

    history.push("/user/search", {
      departureFlight: departureFlight,
      returnFlight: returnFlight,
    });
  };
  const handleClick = () => {
    history.push("/login");
  };

  return (
    <div>
      <div style={{ margin: "1rem 0rem 2rem" }}>
        <h3>Search Flights</h3>
      </div>
      <form onSubmit={onSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div className="form-group">
            <div>
              <TextField
                name="departure_date"
                onChange={handleChange}
                variant="outlined"
                label="Departure"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <br />
          <div className="form-group">
            <div>
              <TextField
                name="return_date"
                onChange={handleChange}
                variant="outlined"
                label="Return"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div className="form-group">
            <div>
              <TextField
                name="from"
                onChange={handleChange}
                variant="outlined"
                label="From"
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <br />
            <div className="form-group">
              <div>
                <TextField
                  name="to"
                  onChange={handleChange}
                  variant="outlined"
                  label="To"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </div>
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div className="form-group">
            <div>
              <TextField
                name="adults"
                onChange={handleChange}
                variant="outlined"
                label="Number of Adult Passengers"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <br />
          <div className="form-group">
            <div>
              <TextField
                name="children"
                onChange={handleChange}
                variant="outlined"
                label="Number of Children Passengers"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
        </Grid>
        <br />
        <div className="form-group">
          <div>
            <InputLabel id="demo-simple-select-label">Cabin Class</InputLabel>
            <Select name="cabin" placeholder="Cabin" onChange={handleChange}>
              <MenuItem value={"economy"}>Economy</MenuItem>
              <MenuItem value={"business"}>Business</MenuItem>
            </Select>
          </div>
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
export default HomePage;
