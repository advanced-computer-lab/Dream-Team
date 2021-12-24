import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";


const EditFlightSeats = (props) => {
  console.log(props.location.state);
  const [flight, setFlight] = useState(
    {}
  );
  const flightId=props.location.state.flight._id;
  const history = useHistory();
  const [arraySeats, setArraySeats] = useState(props.location.state.flight.chosenSeats);
  const [seatsClicked, setSeatsClicked] = useState(Number(props.location.state.flight.passengers));
//  console.log(arraySeats);
//  console.log(flight.seats);



 useEffect(() => {
  axios
    .get("http://localhost:8000/flights/" + flightId)
    .then((response) => {
      console.log(response.data);
      setFlight(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
}, []);
  const handleClick = (clickedSeat) => {
    if (seatsClicked === Number(flight.passengers)&&!arraySeats.includes(clickedSeat)) {
      
      alert("You can't choose more than "+flight.passengers+" seats")
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
    history.push("/seats_return", {
      ...props.location.state,
      flight: { ...flight, chosenSeats: arraySeats },
    });
  };

  return (
    <div>
      <ul>
      <h3>Please Choose the Seats for the Departure Flight:</h3>
      <br/>
        {flight.seats.map((seat) => (
          <li key={seat._id}>
            <Button
              disabled={flight.cabin.toLowerCase()!==seat.cabin||seat.reserved?true:false}
              style={{backgroundColor:arraySeats.includes(seat)?"#519259":""}}
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
        Choose Return Flight Seats
      </Button>
    </div>
  );
};

export default EditFlightSeats;
