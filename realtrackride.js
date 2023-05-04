"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const socketIo = require('socket.io');
// Set up the HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Real-time Ride Tracking</h1>');
});
// Set up the Socket.io server
const io = socketIo(server);
// Track ride locations in memory
const rideLocations = {};
// Listen for new ride locations from the client
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('rideLocation', (location) => {
        console.log(`New ride location received: ${JSON.stringify(location)}`);
        // Update the ride location in memory
        // rideLocations[location.rideId] = location;
        // Broadcast the updated ride location to all clients
        io.emit('rideLocationUpdate', rideLocations);
    });
});
// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
