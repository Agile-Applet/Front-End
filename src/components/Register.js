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
    passwordAgain: "",
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

  const handleRegister = async () => {
    if (user.username.length < 5 || user.password.length < 3) {
      return showAlert("error", "Lomake on täytetty puutteellisesti.", 0);
    }
    if (user.password !== user.passwordAgain) {
      return showAlert("warning", "Syöttämäsi salasanat eivät täsmää.", 0);
    }
    console.log(user);
    const response = await Api.postData("/register", user);
    console.log(response);
    if (response.status === 201) {
      showAlert("success", "Olet rekisteröitynyt onnistuneesti", 0);
    } else if (response.nameIsTaken || response.status === 409) {
      showAlert("error", "Käyttäjätunnus on jo varattu", 0);
    } else {
      showAlert("error", "Rekisteröityminen epäonnistui", 0);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    showRegistration() {
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
          <Alert id="alertBox" variant="filled" severity={alert.severity}>
          <p status={alert.severity} data-test-id="alertmessage">{alert.message}</p>
          </Alert>
        )}
        <DialogTitle>Luo uusi käyttäjä</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="username"
            value={user.username}
            onChange={(event) => handleInputChange(event)}
            label="Käyttäjänimi"
            type="name"
            fullWidth
            variant="standard"
            required
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
            required
          />
          <TextField
            margin="dense"
            name="passwordAgain"
            label="Vahvista Salasana"
            value={user.passwordAgain}
            onChange={(event) => handleInputChange(event)}
            type="password"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Sulje
          </Button>
          <Button variant="contained" onClick={handleRegister}>
            Rekisteröidy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
