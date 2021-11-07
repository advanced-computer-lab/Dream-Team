import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


import ListFlights from "./Components/ListFlights";
import EditFlight from "./Components/EditFlight";
import CreateFlight from './Components/CreateFlight';


function App() {
  return (
    <Router>
      <div className="container">
  
      <br/>
      <Switch>
      <Route exact path="/"  component={ListFlights} />
      <Route exact path="/edit/:id" component={EditFlight} />
      <Route exact path="/create" component={CreateFlight} />
      </Switch>
      </div>
    </Router>
  );

}

export default App;