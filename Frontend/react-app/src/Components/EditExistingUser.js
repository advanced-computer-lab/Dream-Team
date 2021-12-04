import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
// import { TextField } from "@material-ui/core";
// import moment from 'moment';

import "bootstrap/dist/css/bootstrap.min.css";

const EditExistingUser = () => {
  const [user, setUser] = useState({});
  const { email } = useParams();
  const history=useHistory();

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
      .put("http://localhost:8000/user/edit_user/" +email, user)
      .then(()=>history.push('/user_home',{user:user}));
  };

  return user?._id ? (
    <div>
      <h3>Edit Your Info</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>First Name: </label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name: </label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
          />   
        </div>

        <div className="form-group">
          <label>Passport Number: </label>
          <input
            type="text"
            className="form-control"
            name="passport_number"
            value={user.passport_number}
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
