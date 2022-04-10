import React from "react";
import io from "socket.io-client";

const URL = process.env.SOCKET_BASE_STRING || 'http://localhost:3001/table1' || 'http://localhost:3001';

const socket = io(URL, {
    autoConnect: false,
    transports: ['websocket', 'polling', 'flashsocket']
})

const socketContext = React.createContext(socket);

socket.on("connect_error", () => {
    console.log("[Socket] Connection error.");
});

export { socket, socketContext };
