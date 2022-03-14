const io = require("socket.io-client");

const socket = io("https://json.awsproject.link/", {
    autoConnect: false,
})

/* General Events */

socket.on("connect", () => {
    console.log("[Socket] Connection status: " + socket.disconnected + ", ID: " + socket.id);
})

socket.on("disconnect", () => {
    console.log("[Socket] Client disconnected. ID: " + socket.id);
})

socket.on("connect_error", () => {
    console.log("[Socket] Connection error.");
})

/* Custom Events */

socket.on("take-seat", (data) => {
    console.log("[Socket] Take-Seat: " + data);
})

module.exports = { socket }