// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('draw', (data) => {
//     io.emit('draw', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
//   // server.js
// // Modify draw socket handler to include new features

// socket.on('draw', (data) => {
//   io.emit('draw', data);
// });

// socket.on('text', (data) => {
//   io.emit('text', data);
// });

// socket.on('erase', (data) => {
//   io.emit('erase', data);
// });

// socket.on('history', (data) => {
//   io.emit('history', data);
// });

// });

// server.listen(5000, () => {
//   console.log('Listening on port 5000');
// });

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('draw', (data) => {
    console.log('Received draw event:', data);
    io.emit('draw', data);
  });

  socket.on('move', (data) => {
    console.log('Received move event:', data);
    io.emit('move', data);
    
  });

  socket.on('erase', (data) => {
    console.log('Received erase event:', data);
    io.emit('erase', data);
  });

  socket.on('history', (data) => {
    console.log('Received history event:', data);
    io.emit('history', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => console.log('Server running on port 4000'));
