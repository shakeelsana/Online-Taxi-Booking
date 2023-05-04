const http = require('http');
const socketIo = require('socket.io');

// Set up the HTTP server
const server = http.createServer((req: any, res: { writeHead: (arg0: number, arg1: { 'Content-Type': string; }) => void; end: (arg0: string) => void; }) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Real-time Ride Tracking</h1>');
});

// Set up the Socket.io server
const io = socketIo(server);

// Track ride locations in memory
const rideLocations = {};

// Listen for new ride locations from the client
io.on('connection', (socket: {
        on: (arg0: string, arg1: (location: { rideId: string | number; }) =>
            // Set up the HTTP server
            void) => void;
    }) => {
  console.log('Client connected');

  socket.on('rideLocation', (location: { rideId: string | number; }) => {
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
