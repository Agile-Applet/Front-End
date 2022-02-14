import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Api from "../services/Api";
import Alert from "@mui/material/Alert";
import { forwardRef, useImperativeHandle } from "react";

export default forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ severity: "info", message: "" });
  const [data, setData] = useState({
    amount: 0,
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

  const depositFinished = (response) => {
    props.depositCallback(response);
  };

  const handleDeposit = async () => {
    console.log(data);
    const usr = JSON.parse(localStorage.getItem("user"));
    const response = await Api.postData("/deposit", {
      username: usr.username,
      amount: data.amount,
    });
    if (response.status === 200) {
      showAlert("success", "Talletus onnistui", 1000, true);
      depositFinished(response.data);
    } else {
      showAlert("error", "Talletus ei onnistunut", 1000);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    showDeposit() {
      handleClickOpen();
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {alert.message.length > 0 && (
          <Alert variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        )}
        <DialogTitle>Talleta</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="amount"
            value={data.amount}
            onChange={(event) => handleInputChange(event)}
            label="Summa"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Peru
          </Button>
          <Button variant="contained" onClick={handleDeposit}>
            Talleta
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
