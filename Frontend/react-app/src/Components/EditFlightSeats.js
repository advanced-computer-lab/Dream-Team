import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

const EditFlightSeats = (props) => {
  const { price, passengers, chosenSeats, cabin } = props.location.state.flight;
  const [flight, setFlight] = useState({});
  const flightId = props.location.state.flight._id;
  const history = useHistory();
  const reservationID=props.location.state.reservationID
  const type=props.location.state.type;
  const user=JSON.parse(localStorage.getItem("profile")).user
  const [arraySeats, setArraySeats] = useState(
    props.location.state.flight.chosenSeats.map((seat) => ({
      ...seat,
      reserved: true,
    }))
  );

  const oldSeats = props.location.state.flight.chosenSeats.map((seat) => ({
    ...seat,
    reserved: true,
  }));
  const oldSeatNumbers = oldSeats.map((seat) => seat.seatNo);

  const [seatsClicked, setSeatsClicked] = useState(
    Number(props.location.state.flight.passengers)
  );
  //  console.log(arraySeats);
  //  console.log(flight.seats);

  useEffect(() => {
    axios
      .get("http://localhost:8000/flights/" + flightId)
      .then((response) => {
        //setFlight((prev) => ({ ...prev, ...response.data }));

        setFlight({ ...response.data, cabin, price, passengers, chosenSeats });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleClick = (clickedSeat) => {
    console.log(arraySeats);
    console.log(clickedSeat);
    if (
      seatsClicked === Number(flight.passengers) &&
      !arraySeats.find((seat) => seat._id === clickedSeat._id)
    ) {
      alert("You can't choose more than " + flight.passengers + " seats");
      return;
    }

    if (arraySeats.find((seat) => seat._id === clickedSeat._id)) {
      setArraySeats((prev) =>
        prev.filter((seat) => clickedSeat._id !== seat._id)
      );
      setSeatsClicked((prev) => prev - 1);
    } else {
      setSeatsClicked((prev) => prev + 1);

      setArraySeats((prev) => [...prev, clickedSeat]);
    }
  };

  const onSubmit = () => {
    if (seatsClicked < Number(flight.passengers)) {
      alert(
        "Please choose " +
          (Number(flight.passengers) - seatsClicked) +
          " more seat(s)"
      );
      return;
    }
    axios
    .put(
      "http://localhost:8000/user/edit_seats",
     { flight: { ...flight, chosenSeats: arraySeats, oldSeats},reservationID, type, user})
    .then(() => {
      alert("Seats have been changed!");
      history.push("/user_reservations");
    });
    
     
      
    
  };
  return flight?._id ? (
    <div>
      <h3>Please choose the new seats for the flight:</h3>
        <br />
      <ul style={{
        listStyleType: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '250px'
      }}>
        
        {flight.seats.map((seat) => (
          <li key={seat._id}>
            <Button
              disabled={
                (flight.cabin.toLowerCase() !== seat.cabin || seat.reserved) &&
                !oldSeatNumbers.includes(seat.seatNo)
                  ? true
                  : false
              }
              style={{borderRadius: 0,
                backgroundColor: arraySeats.find(
                  (arraySeat) => seat._id === arraySeat._id
                )
                  ? "#519259"
                  : "",
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
        Confirm Seats
      </Button>
    </div>
  ) : null;
};

export default EditFlightSeats;
