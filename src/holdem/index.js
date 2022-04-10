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
    const [tableData, setTableData] = useState();

    const [dealerVisible, setDealerVisible] = useState(false);

    /* Table player data, per seat 
        This data updates regularly as the server sends updates
    */
    const [playerData, setPlayerData] = useState([
        { playerId: 1, playerName: "Tyhjä 1", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-right', avatar: '' },
        { playerId: 2, playerName: "Tyhjä 2", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-left', avatar: '' },
        { playerId: 3, playerName: "Tyhjä 3", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-left', avatar: '' },
        { playerId: 4, playerName: "Tyhjä 4", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-left', avatar: '' },
        { playerId: 5, playerName: "Tyhjä 5", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-right', avatar: '' },
        { playerId: 6, playerName: "Tyhjä 6", seatStatus: 0, money: 0, lastBet: 0, hand: [{ card: "As" }, { card: "Ks" }], showHand: true, handPosition: 'player-cards-right', avatar: '' }
    ]);

    const [tableStatus, setTableStatus] = useState({ fold: true, check: true, bet: true, leave: true });

    /* Current Player Data */
    const [userData, setUserData] = useState({
        seat: 1,
        socketId: null,
        connectionStatus: false,
        roomName: 'default',
        bet: 0
    });

    const buyRef = useRef();
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setAlert] = useState(false);

    /* Handle Buy-In to the table */
    const handleBuyin = (response) => {
        socket.emit("join_seat", { table: 1, seatId: response.seat, amount: response.amount, username: user.username });
    }

    /* Open table buy in prompt */
    const openBuyin = (request) => {

        request = { seatId: request.seatId, table: request.table, uid: undefined, username: user[0].username, amount: user[0].amount }
        buyRef.current.showBuyin(request);
    }

    /* Handle folding */
    const foldHand = () => {
        console.log("[Actions] Fold hand");
        socket.emit("fold_hand", { table: 1, seatId: userData.seat, username: user[0].username, foldHand: true })
    }

    /* Handle checking */
    const checkHand = () => {
        console.log("[Actions] Check hand");
        socket.emit("check_hand", { table: 1, seatId: userData.seat, username: user[0].username, checkHand: true })
    }

    /* Handle betting */
    const betHand = () => {
        console.log("[Actions] Bet Hand -> € " + userData.bet);
        socket.emit("bet_hand", { table: 1, seatId: userData.seat, username: user[0].username, betAmount: userData.bet })
    }

    /* Handle leaving  */
    const leaveTable = () => {
        console.log("[Actions] Leave Table");
        socket.emit("leave_seat", { table: 1, seatId: userData.seat, username: user[0].username });
    }

    /* Reset of alert, comes from alert component */
    const alertCallback = () => {
        setAlertMessage('');
        setAlert(false);
    }

    React.useEffect(() => {
        socket.connect(); // Creates a websocket connection through socket service module

        /* Socket Events */

        /* Connecting to the server */
        socket.on("connect", () => {
            if (socket.connected) {
                console.log("[Socket] Is Connected: " + socket.connected);
                console.log("[Socket] Identifier: " + socket.id);
                console.log("[Socket] Join room.");
                socket.emit("join_room", { name: user[0].username, room: "Pöytä 1" });
                setUserData({ ...userData, socketId: socket.id, bet: 0, connectionStatus: true, roomName: "Pöytä 1" });
            }
        })

        /* Disconnecting from the server */
        socket.on("disconnect", () => {
            console.log("[Socket] Client disconnected. ID: " + socket.id);
            setUserData({ ...userData, socketId: null, connectionStatus: false });
        })

        /* General data updates related to the table */
        socket.on("updateTable", (data) => {
            console.log("[Socket] Update Table.");;
            setPlayerData(data);
        })

        /* Starts a new round */
        socket.on("startGame", (data) => {
            console.log("[Socket] Start game.");
            setDealerVisible(true);
        })

        /* Updates dealer cards */
        socket.on("updateTableCards", (data) => {
            console.log("[Socket] Update table data.");
            if (data[0].status === 'Flop') {
                data[0].cards.splice(3, 2);
            }
            setTableData({ pot: data[0].pot, cards: data[0].cards });
        })

        /* User Error Handling and displaying alert */
        socket.on("userError", (data) => {
            setAlertMessage(data.message);
            setAlert(true);
        });

    }, [userData, user])

    /* Rendering */
    return (
        <div className="main">
            <div className="poker-table">
                <img alt="table" className="poker-table" src={'./assets/table.svg'} />
                {alertMessage.length > 5 && showAlert &&
                    <AlertBox message={alertMessage} callback={alertCallback} />
                }
                {dealerVisible ? <div>
                    <div className="table-pot">
                        <p className="table-pot">Pot: € {tableData.pot}</p>
                    </div>
                    <div className="table-cards">
                        {tableData.cards.map((item, key) => {
                            return (<Playcard card={item.card} key={key} className="playcard" alt="card" />)
                        })}
                    </div></div> : null}
                <div className="dealer">
                    <div className="avatar-normal">
                        <Avatar alt="avatar" src={'https://cdna.artstation.com/p/assets/images/images/039/426/688/large/marina-oman-woman2.jpg?1625858913'} sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120 }}></Avatar>
                        <p className="avatar-normal">50 € / 100 €</p>
                    </div>
                </div>
                <div className="controls">
                    <Button className="controls" variant="contained" onClick={foldHand} disabled={!tableStatus.fold}>Fold</Button>
                    <Button className="controls" variant="contained" onClick={checkHand} disabled={!tableStatus.check}>Check</Button>
                    <Button className="controls" variant="contained" onClick={betHand} disabled={!tableStatus.bet}>Bet</Button>
                    <TextField InputLabelProps={{ className: "textfield_label" }} className="textfield" id="outlined-basic" label="Bet Amount"
                        variant="outlined" value={Number(userData.bet)} onChange={(e) => setUserData({ ...userData, bet: Number(e.target.value) })} />
                    <Button className="controls" style={{ backgroundColor: `rgb(255,0,0)`, marginLeft: '40px' }} variant="contained" onClick={leaveTable} disabled={!tableStatus.leave}>Leave table</Button>
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