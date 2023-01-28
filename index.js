const {betaToken} = require('./livekitToken');
const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.json());

console.log('Dev server is started');

app.get('/',async (req, res) => {
  console.log('Dev server is running');

  res.end("ok");
});

io.on('connection', (socket) => {

  console.log('-------- User Connected -----------');

  socket.on("userWantToConnect", () => {
    console.log("User want to connect triggered!!!");
  });

  socket.on('disconnect', () => {
    console.log('-------- User Disconnected -----------');
    });
});

function generateRoomId() {
  return Math.floor(1000 + Math.random() * 9000);
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});  