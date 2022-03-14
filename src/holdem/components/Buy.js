import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
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
    showAlert("success", "Liitytään pöytään.", 1000, true);
    boughtIn({table: tableId, seat: seatId, amount: amount})
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    showBuyin(data) {
      setSeat(data.seatId);
      setTable(data.table);
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
    </div>
  );
});
