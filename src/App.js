import React from "react";
import "./App.css";
import Appbar from "./components/AppbarWithMenu";
import Games from "./components/Games";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Game from "./components/Game";
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div
      style={{
        margin: "0px auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RecoilRoot>
        <Appbar />
      </RecoilRoot>
      <Box sx={{ flexGrow: 1, paddingLeft: '10vh', paddingRight: '10vh' }}>
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
                  name={"Texas Hold'em"}
                  description={"Small Blind 50 € / Big Blind 100 € Min 1000 € / Max 5000 €"}
                  url={"/holdem"}
                  image={
                    "https://i0.wp.com/golflakeridge.com/wp-content/uploads/2017/09/Texas_Hold_em_Logo_000.png?resize=845%2C321&ssl=1"
                  }
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Game
                  size={"600px"}
                  name={"Emma"}
                  description={"Astu emman maailmaan!"}
                  url={"#"}
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
