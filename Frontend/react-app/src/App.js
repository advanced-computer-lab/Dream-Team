import React from 'react';
import './App.css';
import EditFlight from './Components/editFlight';
import axios from 'axios';
import { Component, useState, useEffect } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
  }


  deleteFlight(id){

    if(window.confirm("Delete?")){

    const path='http://localhost:8000/flights/delete/'+id;
    axios.delete(path);
    }
    
  }

  componentDidMount() {
    
      axios.get('http://localhost:8000/flights/')
      .then(res => {
        this.setState({
          flights: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
      })
  };


  render() {
    const flights = this.state.flights;
    console.log("PrintFLight: " + flights);
   


    return (
      <ul>

      { 
        flights.map(flight =>
          <li key={flight._id}>
          
            <div className="row">
              <p className="left-txt"> <b>Flight Number: </b> {flight.flight_number} </p>
              <p className="left-txt"> <b>Flight Date: </b> {flight.flight_date}   </p>
              <p className="left-txt"> <b>From: </b> {flight.from}   </p>
              <p className="left-txt"> <b>To: </b> {flight.to}   </p>
              <p className="left-txt"> <b>Departure Time: </b> {flight.departure_time}   </p>
              <p className="left-txt"> <b>Arrival Time: </b> {flight.arrival_time}  </p>
              <p className="left-txt"> <b>Economy: </b> {flight.economy_seats_available}   </p>
              <p className="left-txt"> <b>Business: </b> {flight.business_seats_available}</p>
              <button >Edit <EditFlight id={flight._id}/> </button>
              <button onClick={()=>this.deleteFlight(flight._id)}>Delete</button>

            </div>
          </li>


        )
      }

    </ul>

    );
  }

}


// function App(){
//   const [flights,setFlights] = useState([]);
//   const [searchFlights,setSearchedFlights] = useState("");
 


//   useEffect(() => {
//     axios.get('http://localhost:8000/')
//     .then((res) =>{
//       setFlights(res.data)
//     })
//   },[])


//   function search(e){
//     return e.filter(e =>
//        e.flight_number.toStirng().toUpperCase().indexOf(searchFlights)>-1 ||
//        e.flight_date.toStirng().toUpperCase().indexOf(searchFlights)>-1 ||
//        e.from.toUpperCase().indexOf(searchFlights)>-1 ||
//        e.to.toUpperCase().indexOf(searchFlights)>-1 ||
//        e.departure_time.toUpperCase().indexOf(searchFlights)>-1 ||
//        e.arrival_time.toUpperCase().indexOf(searchFlights)>-1 
//     )
//   }




//   return (
//     <div className="">
//       <div className="container">
//         <h1>Dream Team Airlines</h1>  
//         <div className = "form-group">
//           <label>Search for flights</label>
//           <input class="form-control me-2" type="search" placeholder="Search" onChange={(e) => setSearchedFlights(e.target.value)}></input>
//           <div>
//             <App>flights={search(flights)}</App>
//           </div>
//           <table class="table">
//             <thread>
//               <tr>
//                 <th scope="col">Flight Number</th>
//                 <th scope="col">Flight Date</th>
//                 <th scope="col">From</th>
//                 <th scope="col">To</th>
//                 <th scope="col">Departure</th>
//                 <th scope="col">Arrival</th>
//               </tr>
//             </thread>
//             <tbody>
//               {
//                 flights.map((fly) => (
//                 <tr>
//                   <tb>{fly.flight_number}</tb>
//                   <tb>{fly.flight_date}</tb>
//                   <tb>{fly.from}</tb>
//                   <tb>{fly.to}</tb>
//                   <tb>{fly.departure_time}</tb>
//                   <tb>{fly.arrival_time}</tb>
//                 </tr>
                
//                 )
//               )}
                
              

              






//             </tbody>
//           </table>

            
//         </div>

//       </div>
//     </div>
//   );

// }


export default App;
