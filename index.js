
const livekitToken = require('./livekitToken');
const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io")(server);


app.use(express.json());

var i = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//----------------Connection msg---------------------
io.on('connection', (socket) => {
  i = i + 1;
  console.log("------------------------------------------");
  console.log('Socket ID = ', socket.id);
  console.log('user connected');

  const count = io.engine.clientsCount;
  
  console.log("count is = " + count)

  //sending, event = chat message
  socket.emit('chat message', "user " + count + " connected");


  socket.on('chat message', (msg) => {
    // io.emit('chat message', msg);  // sending
    socket.broadcast.emit('chat message', msg);  // sending
    console.log("The msg is: " + msg);
  });

  socket.on('addValue', (data) => {
    var sum = data + data;
    io.emit('showValue', sum);  // sending
    console.log("sum = " + sum);
  });
  
  socket.on('callDetails', (data) => {
    clintID = data;
    roomId = generateRoomId();
    io.emit('showUserName', clintID, roomId);  // sending
    console.log("UserID is " + clintID + " " + roomId);

    var token = betaToken()
    console.log(token);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    var count2 = io.engine.clientsCount;
    console.log("count2 is  = " + count2)
    socket.broadcast.emit('chat message', "user " + count + " disconnected " + count2 + " left");
  });
});
//---------------------------------------------------
function generateRoomId() {
  return Math.floor(1000 + Math.random() * 9000);
}

server.listen(3000, () => {
  console.log('listening on *:3000');
}); 