import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import ChangePassword from "./ChangePassword";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const email = JSON.parse(localStorage.getItem("profile")).user.email;
  const history = useHistory();
  const onSubmit = () => {
    history.push("/edit_user/" + user.email);
  };

  const fetchUserInfoUrl = "http://localhost:8000/user/" + email;
  console.log(fetchUserInfoUrl);
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/" + email)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [email]);
  return user?._id ? (
    <Container component="main" align="left">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="h2">Profile</Typography>
        <Typography variant="h6">
          Name: {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">
          Passport Number: {user.passportNumber}
        </Typography>
        <Typography variant="h6">
          Phone Number: {user.countryCode}
          {user.phoneNumber}
        </Typography>
        <Typography variant="h6">Address: {user.address}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            onSubmit();
          }}
        >
          Edit Profile
        </Button>
        <Button
          variant="contained"
          component={Link}
          to={"/change_password"}
         
        >
          Change Password
        </Button>
      </div>
    </Container>
  ) : null;
};

export default UserProfile;
