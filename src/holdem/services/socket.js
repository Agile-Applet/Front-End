import React from "react";
import io from "socket.io-client";

const socket = io(process.env.SOCKET_BASE_STRING, {
    autoConnect: false,
})

const socketContext = React.createContext(socket);

/* General Events */

/*socket.on("connect", () => {
    console.log("[Socket] Connection status: " + socket.connected + ", ID: " + socket.id);
})

socket.on("disconnect", () => {
    console.log("[Socket] Client disconnected. ID: " + socket.id);
})*/

socket.on("connect_error", () => {
    console.log("[Socket] Connection error.");
})

/* Custom Events */

socket.on("take-seat", (data) => {
    console.log("[Socket] Take-Seat: " + data);
})

export {socket, socketContext};