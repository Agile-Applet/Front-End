import React, { useState, useRef } from "react";
import { Avatar, Button, Slider, Text } from "@mui/material";
import Playcard from "@heruka_urgyen/react-playing-cards/lib/TcB";
import BigBlind from '@mui/icons-material/'
import "./Holdem.css";
import Player from './components/Player';
import Buy from './components/Buy';
import { socket } from './services/socket';

export default function Holdem(props) {

    /* General table data */
    const [tableData, setTableData] = useState({
        pot : 0.00,
        cards : [{card : "Ts"}, {card: "Js"}, {card: "Qs"}, {card: "Ks"}, {card: "As"}]
    })

    /* Table player data, per seat */
    const [playerData, setPlayerData] = useState([
        {playerId: 1, playerName : "Sande", seatStatus: 0, money: 100, lastBet: 0, hand : [{card : "As"}, {card: "Ks"}], showHand: false, handPosition: 'player-cards-right', avatar: 'https://content-eu.invisioncic.com/b310290/monthly_2017_04/Nikolay-Kostyrko_Time1491772457527.jpg.2d6ef3b3f499abd15f631f55bbc2aba5.jpg'},
        {playerId : 2, playerName : "Pelaaja 2", seatStatus: 0, money: 0, lastBet: 0, hand : [{card : "As"}, {card: "Ks"}], showHand : true, handPosition: 'player-cards-left', avatar: 'https://pickaface.net/gallery/avatar/MsMattheis54086b03941f8.png'},
        {playerId : 3, playerName : "Pelaaja 3", seatStatus: 0, money: 0, lastBet: 0, hand : [{card : "As"}, {card: "Ks"}], showHand : true, handPosition: 'player-cards-right', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjgQWa7pOSm_kU8Hx4j2V3ebQYfkBkBDehcMbKqEZEUuh2LE4OELW8lG0nYs1P7O6fii4&usqp=CAU'},
        {playerId : 4, playerName : "Pelaaja 4", seatStatus: 0, money: 0, lastBet: 0, hand : [{card : "As"}, {card: "Ks"}], showHand : true, handPosition: 'player-cards-left', avatar: 'https://pickaface.net/gallery/avatar/unr_padreirene_180720_1215_wuaaj.png'},
        {playerId : 5, playerName : "Pelaaja 5", seatStatus: 0, money: 0, lastBet: 0, hand : [{card : "As"}, {card: "Ks"}], showHand : true, handPosition: 'player-cards-left', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlZRhdBjXKq_kKjZ7Gx9kom1sBkk0WYFQPchjkcNFbmijoVoKXlq0dypJPthCmHx6BHc&usqp=CAU'},
        {playerId : 6, playerName : "Pelaaja 6", seatStatus: 0, money: 0, lastBet: 0, hand : [{card : "As"}, {card: "Ks"}], showHand : true, handPosition: 'player-cards-right', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2p__fecPLO2nG02fp9yax0tlWFcjCQgNwg&usqp=CAU'},
    ]);

    /* Current Player Data */
    const [userData, setUserData] = useState({
        bet: 100,
        playerId : 1,
        seat: 1,
        username : "Sande",
        avatar : "https://content-eu.invisioncic.com/b310290/monthly_2017_04/Nikolay-Kostyrko_Time1491772457527.jpg.2d6ef3b3f499abd15f631f55bbc2aba5.jpg",
        hand : [{card : "As"}, {card: "Ks"}],
        uid : 1,
        status : 1,
    });

    const buyRef = useRef();

    const foldHand = () => {

    }

    const checkHand = () => {

    }

    const bet = () => {

    }

    const handleBuyin = (response) => {
        console.log("Received callback:");
        console.log(response);
        socket.emit("take-seat", {table: 1, seatId: response.seat, username: userData.username, uid: userData.uid});
        let seatId = response.seat-1;
        playerData[seatId] = {playerId: response.seat, playerName : userData.username, seatStatus: 1, money: response.amount, lastBet: 0, hand : userData.hand, showHand: false, handPosition: 'player-cards-right', avatar: userData.avatar};
        setUserData({... userData, status: 2, seat: response.seat});
        console.log(userData);
    }

    const openBuyin = (request) => {
        console.log(request);
        buyRef.current.showBuyin(request);
    }

    React.useEffect(() => {
        console.log("[Socket] Trying to connect...");
        socket.connect();
        console.log("[Socket] Is disconnected: " + socket.disconnected);
    }, [])

    return (
        <div className="main">
            <div className="poker-table">
                <img className="poker-table" src={'./assets/table.svg'}/>
                <div className="table-pot">
                    <p className="table-pot">Pot: € {tableData.pot}</p>
                </div>
                <div className="table-cards">
                    {tableData.cards.map(card => (
                        <Playcard card={card.card} className="playcard"/>
                    ))}
                </div>
                <div className="dealer">
                    <div className="avatar-normal">
                        <Avatar src={'https://cdna.artstation.com/p/assets/images/images/039/426/688/large/marina-oman-woman2.jpg?1625858913'} sx={{display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '6px 12px', width: 120, height: 120}}></Avatar>
                        <p className="avatar-normal">Jakaja</p>
                    </div>
                </div>
                <div className="players">
                <Buy buyCallback={handleBuyin} ref={buyRef}/>
                {playerData.map(player => (
                    <Player player={player} user={userData} controlBuyin={openBuyin}/>
                ))}
                </div>
            </div>
        </div>
    )
}