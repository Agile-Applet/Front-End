import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Api from "../services/Api";
import { forwardRef, useRef, useImperativeHandle } from "react";

export default forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    amount: "",
  });

  const handleDeposit = async () => {
    console.log(data);
    const response = await Api.depositMoney(data);
    console.log(response);
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
