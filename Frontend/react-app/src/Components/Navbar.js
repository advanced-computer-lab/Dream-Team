import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Navbar = (props) => {
  const [userLS, setUserLS] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const typeOfUserLS = userLS?.typeOfUser;
  const history = useHistory();

  const handleAccountClick = () => {
    history.push("/user-profile", {
      ...props.location?.state,
      user: userLS.user,
    });
  };

  const handleClick = () => {
    history.push("/user_reservations", {
      ...props.location?.state,
      user: userLS.user,
    });
  };

  const handleLogout = () => {
    history.push("/login");
    localStorage.clear();
    setUserLS(null);
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        {typeOfUserLS !== "admin" && typeOfUserLS !== "user" ? (
          <>
            <div style={{ flexGrow: 1 }}>
              <Typography
                component={Link}
                to="/"
                variant="h5"
                style={{ textDecoration: "none" }}
                color="primary"
              >
                DREAM AIRLINES
              </Typography>
            </div>
            <Button component={Link} to={`/`} color="secondary">
              Search
            </Button>
            <Button component={Link} to={`/login`} color="secondary">
              Login
            </Button>
          </>
        ) : typeOfUserLS === "admin" ? (
          <>
            <div style={{ flexGrow: 1 }}>
              <Typography
                component={Link}
                to="/admin_home"
                variant="h5"
                style={{ textDecoration: "none" }}
                color="primary"
              >
                DREAM AIRLINES
              </Typography>
            </div>
            <Button component={Link} to={`/admin_home`} color="secondary">
              All Flights
            </Button>
            <Button component={Link} to={`/search`} color="secondary">
              Search Flights
            </Button>
            <Button component={Link} to={`/create`} color="secondary">
              Add Flight
            </Button>
            <Button onClick={handleLogout} color="secondary">
              Logout
            </Button>
          </>
        ) : (
          <>
            <div style={{ flexGrow: 1 }}>
              <Typography
                component={Link}
                to="/user_home"
                variant="h5"
                style={{ textDecoration: "none" }}
                color="primary"
              >
                DREAM AIRLINES
              </Typography>
            </div>
            <Button component={Link} to={`/user/search`} color="secondary">
              Search
            </Button>
            <Button onClick={handleClick} color="secondary">
              Your reservations
            </Button>
            <Button onClick={handleLogout} color="secondary">
              Logout
            </Button>
            <AccountCircleIcon
              color="action"
              fontSize="large"
              onClick={handleAccountClick}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
