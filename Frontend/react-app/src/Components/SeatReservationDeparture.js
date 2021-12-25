import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

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
    if (
      seatsClicked === Number(departureFlight.passengers) &&
      !arraySeats.includes(clickedSeat)
    ) {
      alert(
        "You cant choose more than " + departureFlight.passengers + " seats"
      );
      return;
    }

    if (arraySeats.includes(clickedSeat)) {
      setArraySeats((prev) =>
        prev.filter((seat) => clickedSeat._id !== seat._id)
      );
      setSeatsClicked((prev) => prev - 1);
    } else {
      setSeatsClicked((prev) => prev + 1);
      console.log(seatsClicked);

      setArraySeats((prev) => [...prev, clickedSeat]);
    }
    console.log(arraySeats);
  };

  const onSubmit = () => {
    if (seatsClicked < Number(departureFlight.passengers)) {
      alert(
        "Please choose " +
          (Number(departureFlight.passengers) - seatsClicked) +
          " more seat(s)"
      );
      return;
    }
    console.log(departureFlight);
    history.push("/seats_return", {
      ...props.location.state,
      departureFlight: { ...departureFlight, chosenSeats: arraySeats },
    });
  };

  return (
    <div>
      <h3>Please Choose the Seats for your Departure Flight:</h3>
      <br />
      <ul style={{
        listStyleType: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '250px'
      }}>
        {departureFlight.seats.map((seat) => (
          <li key={seat._id}>
           
            <Button
              disabled={
                departureFlight.cabin.toLowerCase() !== seat.cabin ||
                seat.reserved
                  ? true
                  : false
              }
              style={{
                backgroundColor: arraySeats.includes(seat) ? "#519259" : "",
                borderRadius: 0
              }}
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
