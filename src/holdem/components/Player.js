import React, { } from "react";
import { Avatar, Button } from "@mui/material";
import Playcard from "@heruka_urgyen/react-playing-cards/lib/TcB";
import "../Holdem.css";

export default function Player(props) {

    const getHandPosition = (seatId) => {
        switch(seatId) {
            case 0:
                return "player-cards-top";
            case 1:
                return "player-cards-top";
            case 2:
                return "player-cards-left";
            case 3:
                return "player-cards-right";
            case 4:
                return "player-cards-left";
            case 5:
                return "player-cards-right";
            default:
                return "player-cards-top";
        }
    }

    /* Changes avatar style in case of turn */

    const getAvatarClass = (bool) => {
        if (bool) {
            return "avatar-turn";
        } else {
            return "avatar-normal";
        }
    }

    const takeSeat = (seatId) => {
        console.log("[Actions] Take seat: " + seatId);
        props.controlBuyin({ table: 1, seatId: seatId, username: props.user.username, uid: props.user.uid });
    }

    const GenerateCards = () => {
        console.log(props.hand)
        if (props.data.player.seatId === props.user.seat) {
            return (props.hand.map((item, key) => {
                return (<Playcard card={item.card} key={key} className="playcard" />)
            }))
        } else {
            return (
                <>
                    <Playcard className="playcard" back="true" />
                    <Playcard className="playcard" back="true" />
                </>
            )
        }
    }
    console.log(props.data)
    if (props.data.status === 2) {
        return (
            <div key={props.data.id} className={`player-${props.data.id}`}>
                <div className={getAvatarClass(props.data.hasTurn)}>
                    <Avatar sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120 }} src={props.data.player.avatar}></Avatar>
                    <p className="avatar-normal">{props.data.player.name + props.data.player.role}</p>
                    <div className="avatar-money">
                        <img alt="chips" className="avatar-money" src={(`../assets/chips.svg`)} />
                        <p className="avatar-money">Money: {props.data.player.money}</p>
                    </div>
                    <div className="avatar-money">
                        <img alt="bet" className="avatar-money" src={(`../assets/bet.svg`)} />
                        <p className="avatar-money">Bet: {props.data.player.lastBet}</p>
                    </div>
                </div>
                <div className={getHandPosition(props.data.id)}>
                    <GenerateCards />
                </div>
            </div>
        )
    } else if (props.data.status === 1) {
        return (
            <div key={props.data.id} className={`player-${props.data.id}`}>
                <div className="avatar-wait">
                    <Avatar sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120 }} src={props.data.player.avatar}></Avatar>
                    <p className="avatar-normal">{props.data.player.name + props.data.player.role}</p>
                    <div className="avatar-money">
                        <img alt="chips" className="avatar-money" src={(`../assets/chips.svg`)} />
                        <p className="avatar-money">Money: {props.data.player.money}</p><br />
                        <p className="avatar-money">Waiting</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div key={props.data.id} className={`player-${props.data.id}`}>
                <div className="avatar-normal">
                    <Avatar className="avatar-normal" sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120 }} src={(`../assets/freeseat.png`)} />
                    <p className="avatar-normal">Free Seat</p>
                    <Button variant="contained" className="avatar-normal" onClick={(e) => takeSeat(`${props.data.id}`)}>Take Seat</Button>
                </div>
            </div>
        )
    }
}
