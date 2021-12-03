import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

const SeatReservationDeparture = (props) => {

  console.log(props.location.state);
  const [departureFlight, setDepartureFlight] = useState(
    props.location.state.departureFlight
  );
  const history = useHistory();
  const [arraySeats, setArraySeats] = useState([]);
  const [seatsClicked, setSeatsClicked] = useState(0);

  const handleClick = (clickedSeat) => {
    if (arraySeats.includes(clickedSeat)) {
      setArraySeats((prev) =>
        prev.filter((seat) => clickedSeat._id !== seat._id)
      );
      setSeatsClicked((prev) => prev - 1);
    }
     else if(seatsClicked==departureFlight.passengers){

       }
    else {
      setSeatsClicked((prev) => prev + 1);
      console.log(seatsClicked);

      setArraySeats((prev) => [...prev, clickedSeat]);
    }
    console.log(arraySeats);
  };

  const onSubmit = () => {
    // setDepartureFlight({ ...departureFlight, chosenSeats: arraySeats });
    console.log(departureFlight);
    history.push("/seats_return", {
      ...props.location.state,
      departureFlight: {...departureFlight,chosenSeats: arraySeats}
    });
  };

  return (
    <div>
      <ul>
        {departureFlight.seats.map((seat) => (
          <li key={seat._id}>
            <Button
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
        Choose Return Flight Seats
      </Button>
    </div>
  );
};

export default SeatReservationDeparture;
