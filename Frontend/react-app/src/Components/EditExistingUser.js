import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
// import { TextField } from "@material-ui/core";
// import moment from 'moment';

import "bootstrap/dist/css/bootstrap.min.css";

const EditExistingUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    passportNumber: '',
    email: '',
    address: '',
    countryCode: '',
    phoneNumber: ''
  });
  const { email } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/" + email)
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [email]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8000/user/edit_user/" + email, user)
      .then(() => {
        alert("Profile Updated.");
        history.push("/user-profile", { user: user });
      });
  };

  return user?._id ? (
    <div>
      <h3>Edit Your Info</h3>
      <br></br>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>First Name: </label>
          <input
            className="form-control"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name: </label>
          <input
            className="form-control"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Passport Number: </label>
          <input
            className="form-control"
            name="passportNumber"
            value={user.passportNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address: </label>
          <input
            className="form-control"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Country Code: </label>
          <input
            className="form-control"
            name="countryCode"
            value={user.countryCode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number: </label>
          <input
            className="form-control"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Edit User Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  ) : null;
};

export default EditExistingUser;
