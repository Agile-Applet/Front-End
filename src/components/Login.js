import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Grid, Paper, Avatar, TextField } from '@mui/material';

export default function Login() {

    const paperStyle={padding: '30px 20px', width: 300, margin: "20px auto"} 

    return(
        <Grid>
            <Paper elevation={20} style={paperStyle}>

                <Grid align='center'>
                    <Avatar style={{backgroundColor: '#1bbd7e'}} />
                    <h2 style={{margin: 10}}>Kirjaudu</h2>
                </Grid>

                <form>
                    <TextField 
                    variant='standard' 
                    fullWidth 
                    label='Käyttäjänimi' 
                    />
                    <TextField 
                    variant='standard' 
                    fullWidth 
                    style={{marginTop: 5}} 
                    label='Salasana' 
                    />

                    <Button 
                    type='submit' 
                    variant='contained' 
                    color='primary' 
                    style={{marginTop: 10}}>
                    Kirjaudu
                    </Button>
                </form>
                
            </Paper>
        </Grid>
    )
}