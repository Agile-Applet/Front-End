import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Api from "../services/Api";
import { forwardRef, useImperativeHandle } from "react";

export default forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ severity: "info", message: "" });
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const showAlert = (severity, message, time, close) => {
    setAlert({ severity: severity, message: message });
    setTimeout(() => {
      if (close) {
        handleClose();
        setAlert({ message: "" });
      }
    }, time);
  };

  const loggedIn = (response) => {
    props.userCallback(response);
  };

  const handleLogin = async () => {
    if (user.username.length < 5 || user.password.length < 3) {
      return showAlert("error", "Lomake on täytetty puutteellisesti.", 0);
    }
    console.log(user);
    const response = await Api.postData("/login", user);
    console.log(response);
    if (response.status === 200) {
      showAlert("success", "Olet kirjautunut sisään onnistuneesti", 1000, true);
      loggedIn(response.data);
    } else if (response.status === 401) {
      showAlert("error", "Käyttäjätunnus ja salasana ei täsmää", 0);
    } else {
      showAlert("error", "Kirjautuminen epäonnistui", 0);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    showLogin() {
      handleClickOpen();
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {alert.message.length > 0 && (
          <Alert variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        )}
        <DialogTitle>Kirjaudu sisään</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            value={user.username}
            onChange={(event) => handleInputChange(event)}
            label="Käyttäjänimi"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="password"
            value={user.password}
            onChange={(event) => handleInputChange(event)}
            label="Salasana"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Sulje
          </Button>
          <Button variant="contained" onClick={handleLogin}>
            Kirjaudu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
