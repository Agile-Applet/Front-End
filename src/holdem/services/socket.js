import React from "react";
import io from "socket.io-client";

// const URL = 'https://container-service-1.1bm12m42tdcru.eu-north-1.cs.amazonlightsail.com/table1';
const URL = 'http://localhost:3001/table1';

const socket = io(URL, {
    autoConnect: false,
    transports: ['websocket', 'polling', 'flashsocket']
})

const socketContext = React.createContext(socket);

socket.on("connect_error", () => {
    console.log("[Socket] Connection error.");
});

export { socket, socketContext };
