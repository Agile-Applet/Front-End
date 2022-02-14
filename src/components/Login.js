import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import Api from '../services/Api'

export default function Login() {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const handleLogin =  async () => {
        console.log(user);
        const response = await Api.login(user);
        console.log(response);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    return(
        <div>
            <Button color="inherit" onClick={handleClickOpen}>
                Kirjaudu
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Kirjaudu sisään</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="username"
                    value={user.username}
                    onChange={event => handleInputChange(event)}
                    label="Käyttäjänimi"
                    type="text"
                    fullWidth
                    variant="standard"
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
                />
                </DialogContent>
                <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Sulje</Button>
                <Button variant="contained" onClick={handleLogin}>Kirjaudu</Button>
                </DialogActions>
            </Dialog>
        </div>
        
    )
}