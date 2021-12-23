import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
const SignUp = () => {
  const [newUser, setNewUser] = useState({});
  const history = useHistory();
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/create", { user: newUser })
      .then(() => {
        console.log("qwqwq");
        alert("User Created Successfully");
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" align="center">
      <form onSubmit={handleSubmit}>
        <Container component="main" align="center" style={{ maxWidth: "60%" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Typography variant="h3">Sign Up</Typography>
            <TextField
              label="First Name"
              name="firstName"
              variant="outlined"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="Address"
              name="address"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="Country Code"
              name="countryCode"
              variant="outlined"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="Passport Number"
              name="passportNumber"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="UserName"
              name="username"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              variant="outlined"
              required
            ></TextField>
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </div>
        </Container>
      </form>
    </Container>
  );
};

export default SignUp;
