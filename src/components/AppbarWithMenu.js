import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExitIcon from "@mui/icons-material/ExitToApp";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CasinoIcon from "@mui/icons-material/Casino";
import EuroIcon from "@mui/icons-material/Euro";
import HistoryIcon from "@mui/icons-material/History";
import UserIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Api from "../services/Api";

import Login from "./Login";
import Register from "./Register";
import Deposit from "./Deposit";

const UserContext = React.createContext({});

export default function Appbar() {
  const [state, setState] = useState(false);
  const loginRef = useRef();
  const registerRef = useRef();
  const depositRef = useRef();
  const [user, setUser] = useState({
    username: "",
    saldo: 0.0,
    isAdmin: false,
    isLogged: false,
    cookie: null,
    sessionID: null,
  });
  const [showLogout, setLogout] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      console.log("SET DATA");
      console.log(user);
      setUser(JSON.parse(user));
    } else {
      const usr = {
        username: "",
        saldo: 0.0,
        isAdmin: false,
        isLogged: false,
        cookie: null,
        sessionID: null,
      };
      setUser(usr);
      localStorage.setItem("user", JSON.stringify(usr));
    }
  }, []);

  const handleLogout = async () => {
    const response = await Api.postData("/logout", user);
    setLogout(true);
    const usr = {
      username: "",
      saldo: 0.0,
      isAdmin: false,
      isLogged: false,
      cookie: null,
      sessionID: null,
    };
    setUser(usr);
    localStorage.setItem("user", JSON.stringify(usr));
    if (response.status === 200) {
      setTimeout(() => {
        setLogout(false);
        window.location.reload();
      }, 1500);
    }
  };

  const handleDeposit = (response) => {
    setUser({...user, saldo: response.saldo})
    localStorage.setItem("user", JSON.stringify(user));
  }

  const handleUserdata = (response) => {
    const usr = {
      username: response.username,
      saldo: response.saldo,
      isAdmin: response.isAdmin,
      isLogged: response.isLogged,
      cookie: response.cookie,
      sessionID: response.sessionID,
    };
    setUser(usr);
    localStorage.setItem("user", JSON.stringify(usr));
    window.location.reload();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const MenuContent = (user) => (
    <Box
      sx={{ width: 300, height: "100%", backgroundColor: "#360f40" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <h1 style={{ fontSize: 40, textAlign: "center", color: "#ffffff" }}>
        Casino App
      </h1>
      {user.username.length > 0 && (
        <List>
          <ListItem>
            <ListItemIcon style={{ color: "#ffffff" }}>
              <UserIcon />
            </ListItemIcon>
            <ListItemText
              primary={user.username}
              style={{ color: "#ffffff" }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon style={{ color: "#ffffff" }}>
              <EuroIcon />
            </ListItemIcon>
            <ListItemText
              primary={user.saldo}
              style={{ color: "#ffffff", fontWeight: "bold" }}
            />
          </ListItem>
        </List>
      )}
      <Divider style={{ backgroundColor: "#ffffff" }} />
      <List>
        {["Etusivu", "Pelit"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon style={{ color: "#ffffff" }}>
              {index % 2 === 0 ? <HomeIcon /> : <CasinoIcon />}
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "#ffffff" }} />
          </ListItem>
        ))}
      </List>
      {user.isLogged && (
        <List>
          <Divider style={{ backgroundColor: "#ffffff" }} />
          <ListItem button key="Historia">
            <ListItemIcon style={{ color: "#ffffff" }}>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Pelihistoria" style={{ color: "#ffffff" }} />
          </ListItem>
          <ListItem
            button
            key="Deposit"
            onClick={() => depositRef.current.showDeposit()}
          >
            <ListItemIcon style={{ color: "#ffffff" }}>
              <EuroIcon />
            </ListItemIcon>
            <ListItemText primary="Talleta" style={{ color: "#ffffff" }} />
          </ListItem>
          <ListItem button key="Logout" onClick={handleLogout}>
            <ListItemIcon style={{ color: "#ffffff" }}>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText
              primary="Kirjaudu ulos"
              style={{ color: "#ffffff" }}
            />
          </ListItem>
        </List>
      )}
      {!user.isLogged && (
        <List>
          <Divider style={{ backgroundColor: "#ffffff" }} />
          <ListItem
            button
            key="Login"
            onClick={() => loginRef.current.showLogin()}
          >
            <ListItemIcon style={{ color: "#ffffff" }}>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Kirjaudu" style={{ color: "#ffffff" }} />
          </ListItem>
          <ListItem
            button
            key="Register"
            onClick={() => registerRef.current.showRegistration()}
          >
            <ListItemIcon style={{ color: "#ffffff" }}>
              <AppRegistrationIcon />
            </ListItemIcon>
            <ListItemText primary="Rekisteröidy" style={{ color: "#ffffff" }} />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <UserContext.Provider value={user}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Casino App
            </Typography>
            <Login userCallback={handleUserdata} ref={loginRef} />
            <Register ref={registerRef} />
            <Deposit depositCallback={handleDeposit} user={user} ref={depositRef} />
            {showLogout && (
              <Dialog open={showLogout}>
                <DialogTitle>Kirjauduit ulos</DialogTitle>
                <DialogContent>Olet kirjautunut ulos palvelusta</DialogContent>
              </Dialog>
            )}
            {user.isLogged && (
              <Button color="inherit">
                <ExitIcon onClick={handleLogout} />
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <React.Fragment>
          <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
            {MenuContent(user)}
          </Drawer>
        </React.Fragment>
      </Box>
    </UserContext.Provider>
  );
}
