import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Games() {
  let gameData = [
    {
      cardSize: "big",
      name: "Emma",
      description: "Pelaa emmalla",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/emma_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
    {
      cardSize: "big",
      name: "Jaska",
      description: "Pelaa jaskalla",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/kulta-jaska2_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
    {
      cardSize: "normal",
      name: "Pikapokeri",
      description: "Nauti nopeatempoisen pokeripelin huumasta...",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/pikapokeri_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
    {
      cardSize: "normal",
      name: "Talismaani",
      description: "Talismaanin taikaa",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/talismaani_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
    {
      cardSize: "normal",
      name: "Tuplapotti",
      description: "Mummojen vakiovalinta",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/tuplapotti_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
    {
      cardSize: "normal",
      name: "Luna",
      description: "Otso tais voittaa joskus",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/luna_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
    {
      cardSize: "normal",
      name: "NovaX",
      description: "Pelaa...",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/novax_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
    {
      cardSize: "normal",
      name: "Saaga",
      description: "Pelaa..",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/saaga_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
    {
      cardSize: "normal",
      name: "Hippu",
      description: "Pelaa...",
      url: "/play/emma",
      image:
        "https://i8.amplience.net/i/veikkaus/hippu_tile-image-with-logo?w=480&qlt=80&fmt=auto",
    },
  ];
  return (
    <Grid container direction="row" spacing={3}>
      {gameData.map((game, index) => (
          <Grid item md={4} xs={12} key={index}>
            <Card>
                <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={game.image}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {game.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {game.description}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" variant="contained" href={game.url}>
                    Pelaa
                </Button>
                </CardActions>
            </Card>
          </Grid>
      ))}
    </Grid>
  );
}
