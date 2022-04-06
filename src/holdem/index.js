import React, { useState, useRef } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import Playcard from "@heruka_urgyen/react-playing-cards/lib/TcB";

import Player from './components/Player';
import Buy from './components/Buy';
import AlertBox from './components/Alert';
import { socket } from './services/socket';
import { userState } from '../services/User';
import { useRecoilState } from 'recoil';
import "./Holdem.css";

export default function Holdem(props) {

    /* Recoil User State */
    const user = useRecoilState(userState);

    /* General table data */
    const [tableData, setTableData] = useState({ pot: 0.00, cards: [{ card: "Ts" }, { card: "Js" }, { card: "Qs" }, { card: "Ks" }, { card: "As" }] });

    /* Table player data, per seat */
    const [playerData, setPlayerData] = useState([
        { playerId: 1, playerName: "Sande", seatStatus: 0, money: 100, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: false, handPosition: 'player-cards-right', avatar: '' },
        { playerId: 2, playerName: "Pelaaja 2", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-left', avatar: '' },
        { playerId: 3, playerName: "Pelaaja 3", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-right', avatar: '' },
        { playerId: 4, playerName: "Pelaaja 4", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-left', avatar: '' },
        { playerId: 5, playerName: "Pelaaja 5", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-left', avatar: '' },
        { playerId: 6, playerName: "Pelaaja 6", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-right', avatar: '' }
    ]);

    /* Current Player Data */
    const [userData, setUserData] = useState({
        playerId: 1,
        socketId: null,
        connectionStatus: false,
        roomName: '',
        seat: 1,
        username: '',
        avatar: '',
        hand: [],
        uid: 0,
        status: 0,
        bet: 0
    });

    const buyRef = useRef();
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setAlert] = useState(false);

    const handleBuyin = (response) => {
        console.log("Received callback:");
        console.log(response);
        console.log("[Socket] Emitting JOIN SEAT");
        socket.emit("join_seat", { table: 1, seatId: response.seat, amount: response.amount, username: user.username });
    }

    const openBuyin = (request) => {
        console.log(request);
        buyRef.current.showBuyin(request);
    }

    const foldHand = () => {
        console.log("[Actions] Fold hand");
        socket.emit("fold_hand", { table: 1, seatId: userData.seat, username: user[0].username, foldHand: true })
    }

    const checkHand = () => {
        console.log("[Actions] Check hand");
        socket.emit("check_hand", { table: 1, seatId: userData.seat, username: user[0].username, checkHand: true })
    }

    const betHand = () => {
        console.log("[Actions] Bet Hand -> € " + userData.bet);
        socket.emit("bet_hand", { table: 1, seatId: userData.seat, username: user[0].username, betAmount: userData.bet })
    }

    const leaveTable = () => {
        console.log("[Actions] Leave Table");
        socket.emit("leave_seat", { table: 1, seatId: userData.seat, username: user[0].username });
    }

    const alertCallback = () => {
        setAlertMessage('');
        setAlert(false);
    }

    React.useEffect(() => {
        //console.log("Test print: " + JSON.stringify(user[0]));
        socket.connect();

        /* Joining Server */
        socket.on("connect", () => {
            if (socket.connected) {
                console.log("[Socket] Is Connected: " + socket.connected);
                console.log("[Socket] Identifier: " + socket.id);

                console.log("[Socket] Emitting JOIN ROOM");
                socket.emit("join_room", { name: user[0].username, room: "Pöytä 1" });
            }
        })

        /* Socket Events not used much yet */

        socket.on("disconnect", () => {
            console.log("[Socket] Client disconnected. ID: " + socket.id);
            //setUserData({...userData, socketId: null, connectionStatus : false})
        })

        socket.on("notification", (data) => {
            console.log("[Socket-Event] Notification Received: " + data.title + ", " + data.description);
            //setUserData({...userData, socketId: data.id, username : data.name, roomName : data.room});
        })

        socket.on("users", (data) => {
            console.log("[Socket-Event] User Notification: " + JSON.stringify(data));
        })

        /* General updates related to players and seats (connect,disconnect, taking seat..) */
        socket.on("updateTable", (data) => {
            console.log("Update Table.");
            console.log(data);
            setPlayerData(data);
        })

        /* Update cards and table stuff */
        socket.on("updateTableCards", (data) => {
            setTableData(data);
        })

        socket.on("userError", (data) => {
            setAlertMessage(data.message);
            setAlert(true);
        });

    }, [user])

    /* Rendering */
    return (
        <div className="main">
            <div className="poker-table">
                <img alt="table" className="poker-table" src={'./assets/table.svg'} />
                {alertMessage.length > 5 && showAlert &&
                    <AlertBox message={alertMessage} callback={alertCallback} />
                }
                <div className="table-pot">
                    <p className="table-pot">Pot: € {tableData.pot}</p>
                </div>
                <div className="table-cards">
                    {tableData.cards.map(card => (
                        <Playcard key={card.card} alt="card" card={card.card} className="playcard" />
                    ))}
                </div>
                <div className="dealer">
                    <div className="avatar-normal">
                        <Avatar alt="avatar" src={'https://cdna.artstation.com/p/assets/images/images/039/426/688/large/marina-oman-woman2.jpg?1625858913'} sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120 }}></Avatar>
                        <p className="avatar-normal">Jakaja</p>
                    </div>
                </div>
                <div className="controls">
                    <Button className="controls" variant="contained" onClick={foldHand}>Fold</Button>
                    <Button className="controls" variant="contained" onClick={checkHand}>Check</Button>
                    <Button className="controls" variant="contained" onClick={betHand}>Bet</Button>
                    <TextField InputLabelProps={{ className: "textfield_label" }} className="textfield" id="outlined-basic" label="Bet Amount" 
                    variant="outlined" value={Number(userData.bet)} onChange={(e) => setUserData({ ...user, bet: Number(e.target.value) })} />
                    <Button className="controls" style={{ backgroundColor: `rgb(255,0,0)`, marginLeft: '40px' }} variant="contained" onClick={leaveTable}>Leave table</Button>
                </div>
                <div className="players">
                    <Buy buyCallback={handleBuyin} ref={buyRef} />
                    {playerData.map(player => (
                        <Player key={player.playerId} player={player} user={userData} controlBuyin={openBuyin} />
                    ))}
                </div>
            </div>
        </div>
    )
}