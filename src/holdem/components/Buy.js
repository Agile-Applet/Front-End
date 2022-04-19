import React, { useState } from "react";
import Button from "@mui/material/Button";
import { DialogContentText, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { forwardRef, useImperativeHandle } from "react";

export default forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ severity: "info", message: "" });
  const [tableId, setTable] = useState(0);
  const [seatId, setSeat] = useState(0);
  const [amount, setAmount] = useState(0);
  const [limits, setLimits] = useState({ min: 0, max: 0, small: 0, big: 0 });
  const [userLimit, setUserLimit] = useState(0);

  const showAlert = (severity, message, time, close) => {
    setAlert({ severity: severity, message: message });
    setTimeout(() => {
      if (close) {
        handleClose();
        setAlert({ message: "" });
      }
    }, time);
  };

  const boughtIn = (response) => {
    props.buyCallback(response);
  };

  const handleBuy = async () => {
    if (amount <= userLimit) {
      if (amount < limits.min || amount > limits.max) {
        setAmount(0);
        showAlert("error", "Tarkista panostus.", 1000, true);
      } else {
        showAlert("success", "Liitytään pöytään.", 1000, true);
        boughtIn({ table: tableId, seat: seatId, amount: amount })
        setAmount(0);
      }
    } else {
      setAmount(0);
      showAlert("error", "Ei riittävästi varoja pelitilillä.", 1000, true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    showBuyin(data) {
      setSeat(data.seatId);
      setTable(data.table);
      setUserLimit(data.amount);
      setLimits({ min: 1000, max: 5000, small: 50, big: 100 });
      handleClickOpen();
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (value) => {
    setAmount(value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {alert.message.length > 0 && (
          <Alert variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        )}
        <DialogTitle>Liity pöytään {tableId} - paikalle {seatId}</DialogTitle>
        <DialogContentText>Small Blind 50 € / Big Blind 100 €</DialogContentText>
        <DialogContentText>Min {limits.min} € / Max {limits.max} €</DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="amont"
            value={amount}
            onChange={e => handleInputChange(e.target.value)}
            label="Summa"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Peruuta
          </Button>
          <Button variant="contained" onClick={handleBuy}>
            Liity pöytään
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
});
