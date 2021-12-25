import React, { useState } from "react";
import { useHistory } from "react-router";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import axios from "axios";
const ChangePassword = () => {
  const [user, setUser] = useState({
    _id: JSON.parse(localStorage.getItem("profile")).user._id,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
<<<<<<< HEAD
=======
  const [error2, setError2] = useState(false);
>>>>>>> df7104bb3f339c715d58d0b5f5f8ac1683ea8919
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
=======
    setError2(() => false);
>>>>>>> df7104bb3f339c715d58d0b5f5f8ac1683ea8919
    if (
      user?.newPassword?.length > 0 &&
      user?.confirmNewPassword?.length > 0 &&
      user?.newPassword !== user?.confirmNewPassword
    ) {
      setError(() => true);
    } else {
      setError(() => false);
    }
<<<<<<< HEAD
    axios
      .put("http://localhost:8000/user/reset-password", user)
      .then(() => {
        setSuccess(() => true);
        setTimeout(() => {
          history.push("/user_home");
        }, 1000);
      })
      .catch((err) => setError(() => true));
  };
  return (
    <Container component="main" align="center">
      <form onSubmit={handleSubmit}>
        <Container component="main" align="center" style={{ maxWidth: "60%" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Typography variant="h4">Change Password</Typography>
            <TextField
              label="Old Password"
              name="oldPassword"
              type="password"
              variant="outlined"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              onChange={handleChange}
              variant="outlined"
              error={error}
              required
            ></TextField>
            <TextField
              label="Confirm New Password"
              name="confirmNewPassword"
              onChange={handleChange}
              error={error}
              helperText={error ? "Passwords do not match" : ""}
              variant="outlined"
              type="password"
              required
            />

=======

    if (user?.newPassword === user?.confirmNewPassword) {
      axios
        .put("http://localhost:8000/user/reset-password", user)
        .then(() => {
          setSuccess(() => true);
          setTimeout(() => {
            history.push("/user_home");
          }, 1000);
        })
        .catch((err) => setError2(() => true));
    }
  };
  return (
    <Container component="main" align="center">
      <form onSubmit={handleSubmit}>
        <Container component="main" align="center" style={{ maxWidth: "60%" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Typography variant="h4">Change Password</Typography>
            <TextField
              label="Old Password"
              name="oldPassword"
              type="password"
              variant="outlined"
              error={error2}
              helperText={error2 ? "Incorrect password" : ""}
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              onChange={handleChange}
              variant="outlined"
              error={error}
              required
            ></TextField>
            <TextField
              label="Confirm New Password"
              name="confirmNewPassword"
              onChange={handleChange}
              error={error}
              helperText={error ? "Passwords do not match" : ""}
              variant="outlined"
              type="password"
              required
            />

>>>>>>> df7104bb3f339c715d58d0b5f5f8ac1683ea8919
            <Button variant="contained" type="submit">
              Update
            </Button>
            <div
              style={{
                display: success ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                opacity: success ? 1 : 0,
                transition: "opacity 2s ease-in",
              }}
            >
              <CheckCircleIcon
                style={{ width: "4rem", height: "4rem", color: "#139A43" }}
              />
            </div>
          </div>
        </Container>
      </form>
    </Container>
  );
};

export default ChangePassword;
