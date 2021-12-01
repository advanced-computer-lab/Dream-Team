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

const App=()=>{
  return (
    <Router>
      <div className="container">
  
      <br/>
      <Switch>
      <Route exact path="/user/search" component={UserSearchFlights} />
      <Route exact path="/"  component={ListFlights} />
      <Route exact path="/home"  component={HomePage} />
      <Route exact path="/edit/:id" component={EditFlight} />
      <Route exact path="/create" component={CreateFlight} />
      <Route exact path="/search" component={SearchFlights} />
      <Route exact path="/search/results" component={SearchResults} />
      
      </Switch>
      </div>
    </Router>
  );

}

export default App;