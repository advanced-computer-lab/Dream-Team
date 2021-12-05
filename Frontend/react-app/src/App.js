import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";



import ListFlights from "./Components/ListFlights";
import EditFlight from "./Components/EditFlight";
import CreateFlight from './Components/CreateFlight';
import SearchFlights from './Components/SearchFlights';
import SearchResults from './Components/SearchResults';
import HomePage from './Components/HomePage';
import UserSearchFlights from './Components/UserSearchFlights';
import SummaryOfReservation from './Components/SummaryOfReservation';
import SeatReservationDeparture from './Components/SeatReservationDeparture';
import SeatReservationReturn from './Components/SeatReservationReturn';
import Login from './Components/Login';
import UserHomePage from './Components/UserHomePage';
import ConfirmReservation from './Components/ConfirmReservation';
import ShowReservations from './Components/ShowReservations';
import EditExistingUser from './Components/EditExistingUser';

const App=()=>{
  return (
    <Router>
      <div className="container">
  
      <br/>
      <Switch>
      <Route exact path="/user_reservations" component={ShowReservations} />
      <Route exact path="/user/search" component={UserSearchFlights} />
      <Route exact path="/"  component={HomePage} />
      <Route exact path="/admin_home"  component={ListFlights} />
      <Route exact path="/edit/:id" component={EditFlight} />
      <Route exact path="/create" component={CreateFlight} />
      <Route exact path="/search" component={SearchFlights} />
      <Route exact path="/search/results" component={SearchResults} />
      <Route exact path="/summary" component={SummaryOfReservation} />
      <Route exact path="/seats_departure" component={SeatReservationDeparture} />
      <Route exact path="/seats_return" component={SeatReservationReturn} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/user_home" component={UserHomePage} />
      <Route exact path="/confirm" component={ConfirmReservation} />
      
      <Route exact path="/edit_user/:email" component={EditExistingUser} />

   
      
      
      </Switch>
      </div>
    </Router>
  );

}

export default App;