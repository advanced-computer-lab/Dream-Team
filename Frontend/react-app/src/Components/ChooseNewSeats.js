import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";
    
    const ChooseNewSeats = (props) => {
      console.log(props.location.state);
      const [flight, setFlight] = useState(
        props.location.state.newFlight
      );
      const history = useHistory();
      const [arraySeats, setArraySeats] = useState([]);
      const [seatsClicked, setSeatsClicked] = useState(0);
    
      const handleClick = (clickedSeat) => {
        if (seatsClicked === Number(flight.passengers)&&!arraySeats.includes(clickedSeat)) {
          
          alert("You cant choose more than "+flight.passengers+" seats")
          return;}
    
        if (arraySeats.includes(clickedSeat)) {
          setArraySeats((prev) =>
            prev.filter((seat) => clickedSeat._id !== seat._id)
          );
          setSeatsClicked((prev) => prev - 1);
        } 
        
        else {
          setSeatsClicked((prev) => prev + 1);
          console.log(seatsClicked);
    
          setArraySeats((prev) => [...prev, clickedSeat]);
        }
        console.log(arraySeats);
      };
    
      const onSubmit = () => {
        if (seatsClicked<Number(flight.passengers)){
            alert("Please choose "+ (Number(flight.passengers)-seatsClicked) +" more seat(s)")
          return;
        }
        console.log(flight);
        history.push("/changed_summary", {
          ...props.location.state,
          newFlight: { ...flight, chosenSeats: arraySeats },
        });
      };
    
      return (
        <div>
          <h3>Please Choose the Seats for the New Flight:</h3>
          <br/>
          <ul style={{
        listStyleType: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '250px'
      }}>
          
            {flight.seats.map((seat) => (
              <li key={seat._id}>
                <Button
                  disabled={flight.cabin.toLowerCase()!==seat.cabin||seat.reserved?true:false}
                  style={{backgroundColor:arraySeats.includes(seat)?"#519259":"", borderRadius: 0,}}
                  variant="contained"
                  onClick={() => {
                    handleClick(seat);
                  }}
                >
                  {seat.seatNo}
                </Button>
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            onClick={() => {
              onSubmit()
            }}
          >
            Confirm
          </Button>
        </div>
      );
    };
    
    
    


export default ChooseNewSeats
