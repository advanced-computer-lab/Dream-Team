import React from 'react';
import './App.css';
import flightCard from './Components/flightCard';
import axios from 'axios';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
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
    let flightList;

    if(!flights) {
      flightList = "there is no book record!";
    } else {
      flightList = flights.map((flight, k) =>
        <flightCard flight={flight} key={k} />
      );
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Flight List</h2>
            </div>

            {/* <div className="col-md-11">
              <Link to="/create-book" className="btn btn-outline-warning float-right">
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div> */}

          </div>

          <div className="list">
                {flightList}
          </div>
        </div>
      </div>
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
//     return e.flter(e =>
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
