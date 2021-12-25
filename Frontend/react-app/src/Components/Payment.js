import React from 'react'

const Payment = () => {
    // const makePayment = async (token) => {
    //     const email = JSON.parse(localStorage.getItem("profile")).user.email;
    //     const body = {
    //     token,
    //     product: {
    //     price: totalPrice,
    //     },
    //     email,
    //     };
        
    //     return pay(body)
    //     .then((res) => {
    //     console.log(res.data.charge);
    //     chargeId = res.data.charge.id;
    //     handleSubmit();
    //     })
    //     .catch((err) => console.log(err));
    //     };
    
    
    // const handleSubmit = async () => {
    //     const passengersWithoutReserved = passengerInfoState.map((passenger) => {
    //     delete passenger.departureSeat.reserved;
    //     delete passenger.returnSeat.reserved;
    //     return passenger;
    //     });
    //     const departureFlightBody =
    //     cabin === "Business"
    //     ? {
    //     flight: {
    //     _id: departingFlight._id,
    //     seats: departingFlight.seats,
    //     numberOfAvailableBusinessSeats:
    //     departingFlight.numberOfAvailableBusinessSeats - passengers,
    //     },
    //     }
    //     : {
    //     flight: {
    //     _id: departingFlight._id,
    //     seats: departingFlight.seats,
    //     numberOfAvailableEconomySeats:
    //     departingFlight.numberOfAvailableEconomySeats - passengers,
    //     },
    //     };
        
    //     const returnFlightBody =
    //     cabin === "Business"
    //     ? {
    //     flight: {
    //     _id: returnFlight._id,
    //     seats: returnFlight.seats,
    //     numberOfAvailableBusinessSeats:
    //     returnFlight.numberOfAvailableBusinessSeats - passengers,
    //     },
    //     }
    //     : {
    //     flight: {
    //     _id: returnFlight._id,
    //     seats: returnFlight.seats,
    //     numberOfAvailableEconomySeats:
    //     returnFlight.numberOfAvailableEconomySeats - passengers,
    //     },
    //     };
        
    //     const email = JSON.parse(localStorage.getItem("profile")).user.email;
        
    //     const reservation = {
    //     reservation: {
    //     userId,
    //     departingFlightId: departingFlight._id,
    //     returnFlightId: returnFlight._id,
    //     passengers: passengersWithoutReserved,
    //     class: cabin,
    //     status: "Reserved",
    //     totalPrice,
    //     email,
    //     chargeId,
    //     },
    //     };
        
    //     editFlight(departureFlightBody);
    //     editFlight(returnFlightBody);
        
      
    //     };
    
    return (
        <div>
             {/* <StripeCheckout
        currency="EGP"
        stripeKey="pk_test_51KAZF9I1H5yq7d2TDGJlmZ7YZRlaHrC8SgkgmYKHsCyuVSbmhwof6INrdfjD9jrGJExHY7e6Ihy28MxxAzB1WNrQ00aHEFNzKh"
        token={makePayment}
        name="Reserve Flight"
        amount={totalPrice * 100}
        ></StripeCheckout> */}
        </div>
    )
}

export default Payment
