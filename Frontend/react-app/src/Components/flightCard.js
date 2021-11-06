import React from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';

const flightCard = (props) => {
    const  flight  = props.flight;

    return(
        <div className="card-container">
             
            <div className="desc">
                <h2>{flight.flight_number}</h2>
                <h2>{flight.flight_date}</h2>
                <h2>{flight.from}</h2>
                <h2>{flight.to}</h2>
                <h2>{flight.departure_time}</h2>
                <h2>{flight.arrival_time}</h2>
                <h2>{flight.economy_seats_avaialble}</h2>
                <h2>{flight.business_seats_avaialble}</h2>
            </div>
        </div>
    )
};

export default flightCard;