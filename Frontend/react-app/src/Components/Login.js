import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    axios
      .post("http://localhost:8000/user/login", { user: user })
      .then((res) => {
        localStorage.setItem(
          "profile",
          JSON.stringify({
            message: res.data.message,
            token: res.data.token,
            typeOfUser: res.data.typeOfUser,
            user: res.data.user,
          })
        );
        console.log(res.data.typeOfUser);
        if (props.location.state == null) {
          history.push(
            "/" + (res.data.typeOfUser === "admin" ? "admin_home" : "user_home"),
            { ...props.location.state, user: res.data.user }
          );
        }
         else {
          history.push("/seats_departure", {
            ...props.location.state,
            user: res.data.user,
          });
        }
        
      })
      .catch((err) => {
        setError(() => true);
      });
    // axios
    //   .get("http://localhost:8000/user/" + data.get("email"))
    //   .then((result) => {
    //     if (result.data.length == 0) {
    //       alert("This email is not signed up. Please Sign Up");
    //     } else if (data.get("password") === result.data.password) {
    //       if (result.data.admin === true) {
    //         history.push("/admin_home", {
    //           user: result.data[0],
    //         });
    //       } else if (props.location.state == null) {
    //         history.push("/user_home", {
    //           user: result.data,
    //         });
    //       } else {
    //         history.push("/seats_departure", {
    //           ...props.location.state,
    //           user: result.data,
    //         });
    //        }
    //     } else {
    //       alert("Wrong Password Please Try Again");
    //     }
    //   });
    // // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              id="email"
              error={error}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              onChange={handleChange}
              fullWidth
              error={error}
              helperText={error ? "Incorrect username or password" : ""}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
//export default Login;
