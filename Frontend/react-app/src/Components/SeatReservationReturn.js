import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";
const SeatReservationReturn = (props) => {
  const [returnFlight, setReturnFlight] = useState(
    props.location.state.returnFlight
  );
  console.log(props.location.state);
  const history = useHistory();
  const [arraySeats, setArraySeats] = useState([]);
  const [seatsClicked, setSeatsClicked] = useState(0);

  const handleClick = (clickedSeat) => {

    if (seatsClicked === Number(returnFlight.passengers)&&!arraySeats.includes(clickedSeat)) {
      
      alert("You cant choose more than "+returnFlight.passengers+" seats")
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
    if (seatsClicked<Number(returnFlight.passengers)){
      alert("Please choose "+ (Number(returnFlight.passengers)-seatsClicked) +" more seat(s)")
    return;
  }
    // setReturnFlight({ ...returnFlight, chosenSeats: arraySeats });
    console.log(returnFlight);
    history.push("/confirm", {
      ...props.location.state,
      returnFlight: { ...returnFlight, chosenSeats: arraySeats },
    });
  };

  return (
    <div>
      <h3>Please Choose the Seats for the Return Flight:</h3>
      <br/>
      <ul style={{
        listStyleType: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '250px'
      }}>

        {returnFlight.seats.map((seat) => (
          <li key={seat._id}>
            <Button
              disabled={returnFlight.cabin.toLowerCase()!==seat.cabin||seat.reserved?true:false}
              style={{backgroundColor:arraySeats.includes(seat)?"#519259":"", borderRadius: 0}}
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
          onSubmit();
        }}
      >
        Done
      </Button>
    </div>
  );
};

export default SeatReservationReturn;
