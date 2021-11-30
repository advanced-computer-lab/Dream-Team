import React, { useState } from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const HomePage = () => {
    const history = useHistory();


    const [flight, setFlight] = useState([]);

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
    <br>
    </br>
    <h4>Search Flights</h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <br>
    </br>
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
          <input
            type="submit"
            value="Search Flights"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
)
}
export default HomePage;

