
const {betaToken} = require('./livekitToken');
const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.json());


var i = 0;
// var tokens = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// var token = betaToken("myroom448", "DevendraBharti");
//     // tokens.push(token);
//     console.log(token);


//----------------Connection msg---------------------
io.on('connection', (socket) => {
  i = i + 1;
  console.log("------------------------------------------");
  console.log('Socket ID = ', socket.id);
  console.log('user connected');
  const count = io.engine.clientsCount;
  console.log("count is = " + count)

  socket.emit('chat message', "user " + count + " connected");
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    // socket.broadcast.emit('chat message', msg);  // sending
    console.log("The msg is: " + msg);
  });

  socket.on('addValue', (data) => {
    var sum = data + data;
    io.emit('showValue', sum);  // sending
    console.log("sum = " + sum);
  });
  
  // ------------------ call ---------------------------
  
  socket.on('call', async (data) => {
    clintID = data;
    // roomId = generateRoomId();
    roomId = "7347";
    console.log("UserID is " + clintID + " " + roomId);

    // generating tokens
    var token = await betaToken(roomId, clintID);
    // tokens.push(token);
    console.log(token);
  
    io.emit('receiveToken', token);  // sending
  });


  //---------------------------------------------------

  socket.on('disconnect', () => {
    console.log('-------- user disconnected -----------');
    });
});

function generateRoomId() {
  return Math.floor(1000 + Math.random() * 9000);
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});  