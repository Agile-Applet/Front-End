import React, { useRef } from "react";
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
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import Login from "./Login";
import Register from "./Register";
import Deposit from "./Deposit";

export default function Appbar() {
  const [state, setState] = React.useState(false);
  const loginRef = useRef();
  const registerRef = useRef();
  const depositRef = useRef();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const MenuContent = () => (
    <Box
      sx={{ width: 300, height: "100%", backgroundColor: "#360f40" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <h1
        style={{ fontSize: 40, textAlign: "center", color: "#ffffff" }}
      >
        Casino App
      </h1>
      <List>
        <ListItem>
            <ListItemIcon style={{ color: "#ffffff" }}>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary="Himo Pelaaja" style={{ color: "#ffffff" }} />
          </ListItem>
          <ListItem>
            <ListItemIcon style={{ color: "#ffffff" }}>
              <EuroIcon />
            </ListItemIcon>
            <ListItemText primary="24 973.19" style={{ color: "#ffffff", fontWeight: 'bold' }} />
          </ListItem>
      </List>
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
      <List>
      <ListItem button key="Historia">
            <ListItemIcon style={{ color: "#ffffff" }}>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Pelihistoria" style={{ color: "#ffffff" }}/>
          </ListItem>
          <ListItem button key="Deposit">
            <ListItemIcon style={{ color: "#ffffff" }}>
              <EuroIcon />
            </ListItemIcon>
            <ListItemText primary="Talleta" style={{ color: "#ffffff" }} onClick={() => depositRef.current.showDeposit()}/>
          </ListItem>
      </List>
      <Divider style={{ backgroundColor: "#ffffff" }} />
      <List>
          <ListItem button key="Login">
            <ListItemIcon style={{ color: "#ffffff" }}>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Kirjaudu" style={{ color: "#ffffff" }} onClick={() => loginRef.current.showLogin()}/>
          </ListItem>
          <ListItem button key="Register">
            <ListItemIcon style={{ color: "#ffffff" }}>
              <AppRegistrationIcon />
            </ListItemIcon>
            <ListItemText primary="Rekisteröidy" style={{ color: "#ffffff" }} onClick={() => registerRef.current.showRegistration()}/>
          </ListItem>
      </List>
    </Box>
  );

  return (
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
          <Login ref={loginRef}/>
          <Register ref={registerRef}/>
          <Deposit ref={depositRef}/>
          <Button color="inherit">
            <ExitIcon href="/logout" />
          </Button>
        </Toolbar>
      </AppBar>
      <React.Fragment>
        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
          {MenuContent()}
        </Drawer>
      </React.Fragment>
    </Box>
  );
}
