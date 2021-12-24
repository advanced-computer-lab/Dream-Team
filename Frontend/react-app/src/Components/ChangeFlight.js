import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { TextField } from "@material-ui/core"  
import { useHistory } from "react-router-dom";
import { useState } from 'react';
const ChangeFlight = (props) => {
    
    
      const history = useHistory();
       
      const [flight, setFlight] = useState({from:props.location.state.from, to:props.location.state.to});
    
      const handleChange = (e) => {
         if (e.target.name === "adults" || e.target.name === "children") {
            if (flight.hasOwnProperty("passengers")) {
              let i = flight.passengers;
              setFlight({
                ...flight,
                passengers: Number(i) + Number(e.target.value),
              });
              
            } else {
              setFlight({ ...flight, passengers: e.target.value });
              
            }
          }
          else{
        setFlight({ ...flight, [e.target.name]: e.target.value });
          }
      };
      const onSubmit = (e) => {
        e.preventDefault();
      
        history.push("/new_search", {...props.location.state,flight:flight});
      };
    
      return (
        <div>
          <h3>Search Flights</h3>
          <form onSubmit={onSubmit}>
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
                value={props.location.state.from}
              />
            </div>
            <br />
            <div className="form-group">
              <label>To: </label>
              <input
                type="text"
                className="form-control"
                name="to"
                value={props.location.state.to}

              />
            </div>
            <br />
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
          <InputLabel id="demo-simple-select-label">Cabin Class</InputLabel>
            <Select name="cabin" placeholder="Cabin" onChange={handleChange}>
              <MenuItem value={"economy"}>Economy</MenuItem>
              <MenuItem value={"business"}>Business</MenuItem>
            </Select>
        </div>
    
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
    

export default ChangeFlight
