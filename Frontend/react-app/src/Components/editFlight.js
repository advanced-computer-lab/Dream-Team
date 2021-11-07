import React from "react";
import '../App.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Component, useState, useEffect } from 'react';

export default class EditFlight extends Component {
    constructor(props) {
      super(props);
      
      this.onChangeFlightNumber = this.onChangeFlightNumber.bind(this);
      this.onChangeFlightDate = this.onChangeFlightDate.bind(this);
      this.onChangeFrom = this.onChangeFrom.bind(this);
      this.onChangeTo = this.onChangeTo.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeDepartureTime = this.onChangeDepartureTime.bind(this);
      this.onChangeArrivalTime = this.onChangeArrivalTime.bind(this);
      this.onChangeEconomy = this.onChangeEconomy.bind(this);
      this.onChangeBusiness = this.onChangeBusiness.bind(this);

      this.state = {
        flight_number:0,
        flight_date: new Date(),
        from: '',
        to: '',
        departure_time: '',
        arrival_time:'',
        economy_seats_available:0,
        business_seats_available:0
      }
    }
  
    componentDidMount() {
      axios.get('http://localhost:8000/flights/'+this.props.id)
        .then(response => {
          this.setState({
            flight_number:response.data.flight_number,
            flight_date: new Date(response.data.flight_date),
            from: response.data.from,
            to: response.data.to,
            departure_time: response.data.departure_time,
            arrival_time:response.data.arrival_time,
            economy_seats_available:response.data.economy_seats_available,
            business_seats_available:response.data.business_seats_available,
            
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
  
  
    }
  
    onChangeFlightNumber(e) {
      this.setState({
        flight_number: e.target.value
      })
    }
  
    onChangeTo(e) {
      this.setState({
        To: e.target.value
      })
    }
  
    onChangeFrom(e) {
      this.setState({
        from: e.target.value
      })
    }
  
    onChangeFlightDate(date) {
      this.setState({
        flight_date: date
      })
    }
    onChangeDepartureTime(e) {
      this.setState({
        departure_time: e.target.value
      })
    }
    onChangeArrivalTime(e) {
      this.setState({
        arrival_time: e.target.value
      })
    }
    onChangeEconomy(e) {
      this.setState({
        economy_seats_available: e.target.value
      })
    }
    onChangeBusiness(e) {
      this.setState({
        business_seats_available: e.target.value
      })
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      const flight = {
            flight_number:this.state.flight_number,
            flight_date: this.state.flight_date,
            from: this.state.from,
            to:this.state.to,
            departure_time: this.state.departure_time,
            arrival_time:this.state.arrival_time,
            economy_seats_available:this.state.economy_seats_available,
            business_seats_available:this.state.business_seats_available
      }
  
      console.log(flight);
  
      axios.put('http://localhost:8000/flights/update/' + this.props.id, flight)
        .then(res => console.log(res.data));
  
      
    }
  
    render() {
      return (
      <div>
        <h3>Edit Flight Log</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group"> 
            <label>Flight Number: </label>
            <input  type="text"
                className="form-control"
                value={this.state.flight_number}
                onChange={this.onChangeFlightNumber}
                />
          </div>
          <div className="form-group">
            <label>Flight Date: </label>
            <div>
              <DatePicker
                selected={this.state.flight_date}
                onChange={this.onChangeFlightDate}
              />
            </div>
          </div>

          <div className="form-group">
            <label>From: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.from}
                onChange={this.onChangeFrom}
                />
          </div>
          <div className="form-group">
            <label>To: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.to}
                onChange={this.onChangeTo}
                />
          </div>
          <div className="form-group">
            <label>Departure Time: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.departure_time}
                onChange={this.onChangeDepartureTime}
                />
          </div>
          <div className="form-group">
            <label>Arrival Time: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.arrival_time}
                onChange={this.onChangeArrivalTime}
                />
          </div>
          <div className="form-group">
            <label>Economy Seats: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.economy_seats_available}
                onChange={this.onChangeEconomy}
                />
          </div>
          <div className="form-group">
            <label>Business: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.business_seats_available}
                onChange={this.onChangeBusiness}
                />
          </div>
         
  
          <div className="form-group">
            <input type="submit" value="Edit Flight Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
      )
    }
  }
