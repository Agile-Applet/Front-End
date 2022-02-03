import React from "react";
import "./App.css";
import Appbar from "./components/AppbarWithMenu";
import Games from "./components/Games";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Game from "./components/Game";

function App() {
  return (
    <div
      style={{
        margin: "0px auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Appbar />
      <Box sx={{ flexGrow: 1, paddingLeft: '10vh', paddingRight : '10vh' }}>
        <Grid container direction="row" spacing={16}>
          <Grid item lg={6} md={8} xs={12}>
            <h2>Pelikokoelma: </h2>
            <Games />
          </Grid>
          <Grid item lg={6} md={4} xs={12}>
            <h2> Veikkausmafia suosittelee:</h2>
            <Grid container direction="row" spacing={6}>
              <Grid item md={6} xs={12}>
            <Game
              size={"600px"}
              name={"Jaska"}
              description={"Astu jaskan maailmaan!"}
              url={"/play/iso"}
              image={
                "https://i8.amplience.net/i/veikkaus/kulta-jaska2_tile-image-with-logo?w=480&qlt=80&fmt=auto"
              }
            />
            </Grid>
            <Grid item md={6} xs={12}>
            <Game
              size={"600px"}
              name={"Emma"}
              description={"Astu emman maailmaan!"}
              url={"/play/iso"}
              image={
                "https://i8.amplience.net/i/veikkaus/emma_tile-image-with-logo?w=480&qlt=80&fmt=auto"
              }
            />
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
