import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertBox(props) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Järjestelmä ilmoittaa</DialogTitle>
        <DialogContent>
          <Alert severity="error" variant="filled">
            <AlertTitle>Virhetilanne</AlertTitle>
            {props.message}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Ok, jatka eteenpäin
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
