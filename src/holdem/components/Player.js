import React, { } from "react";
import { Avatar, Button } from "@mui/material";
import Playcard from "@heruka_urgyen/react-playing-cards/lib/TcB";
import "../Holdem.css";

export default function Player(props) {

    const takeSeat = (seatId) => {
        console.log("[Actions] Take seat: " + seatId);
        props.controlBuyin({ table: 1, seatId: seatId, username: props.user.username, uid: props.user.uid });
    }

    /* Changes avatar style in case of turn */

    let avatarClass = 'avatar-normal';
    if ( props.player.hasTurn ) {
        avatarClass = 'avatar-turn';
    }

    if (props.player.seatStatus === 1) {
        return (
            <div key={props.player.playerId} className={`player-${props.player.playerId}`}>
                <div className={avatarClass}>
                    <Avatar sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120 }} src={props.player.avatar}></Avatar>
                    <p className="avatar-normal">{props.player.playerName + props.player.role}</p>
                    <div className="avatar-money">
                        <img alt="chips" className="avatar-money" src={(`../assets/chips.svg`)} />
                        <p className="avatar-money">Money: {props.player.money}</p>
                    </div>
                    <div className="avatar-money">
                        <img alt="bet" className="avatar-money" src={(`../assets/bet.svg`)} />
                        <p className="avatar-money">Bet: {props.player.lastBet}</p>
                    </div>
                </div>
                {props.player.hand.length > 0 &&
                    <div className={props.player.handPosition}>
                        {props.player.hand.map((item, key) => {
                            return (<Playcard card={item.card} key={key} className="playcard" back={props.player.showHand} />)
                        })}
                    </div>
                }
            </div>
        )
    } else if (props.player.seatStatus === 2) {
        return (
            <div key={props.player.playerId} className={`player-${props.player.playerId}`}>
                <div className="avatar-normal">
                    <Avatar sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120 }} src={(`../assets/freeseat.png`)} />
                    <p className="avatar-normal">Free Seat</p>
                    <Button variant="contained" className="avatar-normal" onClick={(e) => takeSeat(`${props.player.playerId}`)} disabled>Take Seat</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div key={props.player.playerId} className={`player-${props.player.playerId}`}>
                <div className="avatar-normal">
                    <Avatar sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120 }} src={(`../assets/freeseat.png`)} />
                    <p className="avatar-normal">Free Seat</p>
                    <Button variant="contained" className="avatar-normal" onClick={(e) => takeSeat(`${props.player.playerId}`)}>Take Seat</Button>
                </div>
            </div>
        )
    }
}
