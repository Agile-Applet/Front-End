import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import Playcard from "@heruka_urgyen/react-playing-cards/lib/TcB";
import "../Holdem.css";
import { socket } from '../services/socket';

export default function player(props) {

    const foldHand = () => {
        console.log("[Actions] Fold hand");
        socket.emit("fold", {table: 1, seatId: props.user.seat, username: props.user.username, uid: props.user.uid})
    }
    
    const checkHand = () => {
        console.log("[Actions] Check hand");
        socket.emit("check", {table: 1, seatId: props.user.seat, username: props.user.username, uid: props.user.uid})
    }
    
    const betHand = () => {
        console.log("[Actions] Bet Hand");
        socket.emit("bet", {table: 1, seatId: props.user.seat, username: props.user.username, uid: props.user.uid, amount: 0})
    }
    
    const takeSeat = (seatId) => {
        console.log("[Actions] Take seat: " + seatId);
        props.controlBuyin({table: 1, seatId: seatId, username: props.user.username, uid: props.user.uid});
    }
    
    if ( props.player.seatStatus == 1) {
        return (
            <div key={props.player.playerId} className={`player-${props.player.playerId}`}>
                <div className="avatar-normal">
                    <Avatar sx={{display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120}} src={props.player.avatar}></Avatar>
                    <p className="avatar-normal">{props.player.playerName}</p>
                    <div className="avatar-money">
                        <img className="avatar-money" src={(`../assets/chips.svg`)}/>
                        <p className="avatar-money">Money: {props.player.money}</p>
                    </div>
                    <div className="avatar-money">
                        <img className="avatar-money" src={(`../assets/bet.svg`)}/>
                        <p className="avatar-money">Bet: {props.player.lastBet}</p>
                    </div>
                </div>
                {props.player.hand.length > 0 &&
                <div className={props.player.handPosition}>
                    <Playcard card={props.player.hand[0].card} className="playcard" back={props.player.showHand}/>
                    <Playcard card={props.player.hand[1].card}  className="playcard" back={props.player.showHand}/>
                </div>
                }
                {props.player.playerId == props.user.playerId && props.player.hand.length > 0 &&
                    <div className="controls">
                        <Button variant="contained" onClick={foldHand}>Fold</Button>
                        <Button variant="contained" onClick={checkHand}>Check</Button>
                        <Button variant="contained" onClick={betHand}>Bet</Button>
                    </div>
                }
            </div>
        )
    } else {
        return (
        <div key={props.player.playerId} className={`player-${props.player.playerId}`}>
            <div className="avatar-normal">
                <Avatar sx={{display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120}} src={(`../assets/freeseat.png`)}/>
                <p className="avatar-normal">Free Seat</p>
                <Button variant="contained" className="avatar-normal" onClick={(e) => takeSeat(`${props.player.playerId}`)}>Take Seat</Button>
            </div>
        </div>
        )
    }
}