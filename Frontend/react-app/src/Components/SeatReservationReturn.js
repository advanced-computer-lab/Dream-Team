
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router";
import axios from "axios";
const SeatReservationReturn = (props) => {
    const [returnFlight, setReturnFlight] = useState(props.location.state.returnFlight);
    console.log(returnFlight);
    const history=useHistory();
    const [arraySeats, setArraySeats]=useState([]);
    const [seatsClicked, setSeatsClicked] = useState(0);

    const handleClick = (clickedSeat) => {
     if(arraySeats.includes(clickedSeat)){
         setArraySeats((prev) => prev.filter((seat)=> clickedSeat._id !== seat._id))
         setSeatsClicked((prev) => prev - 1);
     }
    //  else if(seatsClicked==departureFlight.passengers){
         
    //    }
       
       else{
         setSeatsClicked((prev) => prev + 1);
           console.log(seatsClicked);
           
           setArraySeats((prev)=>[...prev, clickedSeat])

       }
       console.log(arraySeats);
       
      };

      const onSubmit = () => {
       
        setReturnFlight({...returnFlight,chosenSeats:arraySeats});
        history.push("/seats_return",{
          departureFlight:props.location.state.departureFlight,
          returnFlight:returnFlight
        })
    
     
      };


    return (
        <div>
            <ul>
        {returnFlight.seats.map((seat) => (
          <li key={seat._id}>
            <Button variant="contained"  onClick={() =>{handleClick(seat)}} >
        {seat.seatNo}
      </Button>
          </li>
        ))}
      </ul>
      <Button variant="contained"  onClick={() =>{onSubmit()}} >
          Confirm Reservation 
      </Button>

        </div>
    )
}

export default SeatReservationReturn
