
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router";
import axios from "axios";
const SeatReservationDeparture = (props) => {
    const [departureFlight, setDepartureFlight] = useState(props.location.state.departureFlight);
    console.log(departureFlight);
    const history=useHistory();
    const [arraySeats, setArraySeats]=useState([]);
    let seatsClicked=0;

    const handleClick = (clickedSeat) => {
     if(arraySeats.includes(clickedSeat)){
         setArraySeats((prev) => prev.filter((seat)=> clickedSeat._id !== seat._id))
     }
     else if(seatsClicked==departureFlight.passengers){
         
       }
       
       else{
           seatsClicked++;
           setArraySeats((prev)=>prev.push(clickedSeat))

       }
      };


      const onSubmit = () => {
       
        setDepartureFlight({...departureFlight,chosenSeats:arraySeats});
        history.push("/seats_return",{
          departureFlight:departureFlight,
          returnFlight:props.location.state.returnFlight
        })
    
     
      };


    return (
        <div>
            <ul>
        {departureFlight.seats.map((seat) => (
          <li key={seat._id}>
            <Button variant="contained" href="#contained-buttons" onClick={() =>{handleClick(seat)}} >
        {seat.seatNo}
      </Button>
          </li>
        ))}
      </ul>
      <Button variant="contained" href="#contained-buttons" onClick={() =>{onSubmit()}} >
        Choose Return Flight Seats
      </Button>

        </div>
    )
}

export default SeatReservationDeparture
