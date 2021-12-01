import React, { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/Menu";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  console.log("hi");

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
    //   let searchUrl = "/search/departure?";
    //   const noOfKeys = Object.keys(flight).length;
    //   Object.entries(flight).map((entry, i) => {
    //     let [key, value] = entry;
    //     let last = i + 1 === noOfKeys ? "" : "&";
    //     return (searchUrl += key + "=" + value + last);
    //   });

    history.push("/user/search", {
      departureFlight: departureFlight,
      returnFlight: returnFlight,
    });
  };

  return (
    <div>
      <h1>Dream Airlines</h1>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br></br>
      <h4>Search Flights</h4>
      <form onSubmit={onSubmit}>
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
        <br />

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
        <br />
        <div className="form-group">
          <div>
            <TextField
              name="seats"
              onChange={handleChange}
              variant="outlined"
              label="Number of Passengers"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <div>
            <TextField
              name="cabin"
              onChange={handleChange}
              variant="outlined"
              label="Cabin Class"
              InputLabelProps={{ shrink: true }}
            />
            {/* <InputLabel id="demo-simple-select-label">Cabin Class</InputLabel>
            <Select name="cabin" label="Age" onChange={handleChange}>
              <MenuItem value={"economy"}>Ecocnomy</MenuItem>
              <MenuItem value={"business"}>Business</MenuItem>
  </Select>*/}
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
