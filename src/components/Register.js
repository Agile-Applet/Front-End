import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import Api from '../services/Api'
import { forwardRef, useRef, useImperativeHandle } from "react"

export default forwardRef((props,ref) => {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const handleRegister = async () => {
        console.log(user);
        const response = await Api.registerUser(user);
        console.log(response);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    useImperativeHandle(ref, () => ({
        showRegistration() {
          handleClickOpen()
        },
    }))
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    return(
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Luo uusi käyttäjä</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Sähköposti"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                />
                <TextField
                    margin="dense"
                    name="username"
                    value={user.username}
                    onChange={event => handleInputChange(event)}
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
                    onChange={event => handleInputChange(event)}
                    label="Salasana"
                    type="password"
                    fullWidth
                    variant="standard"
                    required
                />
                <TextField
                    margin="dense"
                    name="checkPassword"
                    label="Vahvista Salasana"
                    type="password"
                    fullWidth
                    variant="standard"
                    required
                />
                </DialogContent>
                <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Sulje</Button>
                <Button variant="contained" onClick={handleRegister}>Rekisteröidy</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
})