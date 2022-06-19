const express = require('express'),
  cors = require('cors'),
  morgan = require('morgan'),
  colors = require('colors'),
  app = express();

const server = app.listen(5000, () => {
  console.log(`Server listening on port ${5000}`.bgGreen);
});
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('callEnding', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', (data) => {
    socket.to(data.userToCall).emit('callUser', {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on('answerCall', (data) => {
    socket
      .to(data.to)
      .emit('callAccepted', { signal: data.signal, from: data.from });
  });
});
