const {betaToken} = require('./livekitToken');
const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.json());

console.log('Dev server is started');

// app.get('/',async (req, res) => {
//   console.log('Dev server is running');

//   res.end("ok");
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// ---------- global variables -----------

var users = [];
var mylist = [];
console.log(users);
console.log(users.length);


//----------------------------------------

io.on('connection', (socket) => {

  users.push(socket.id);
  console.log('--- User ' + socket.id.toString() + ' Connected ---');

  socket.on("userWantToConnect", async (myID) => {
    console.log(" User want to connect triggered!!!");

    await callrequest(myID);

    console.log("myList");
    console.log(mylist);
  });

  socket.on("accepted", async (id_b) => {

    console.log("----------- acceped is triggred -----------");
    console.log("user A id is: " + socket.id);
    console.log("user B id is: " + id_b);
    roomId = generateRoomId();
    token1 = await betaToken(roomId, socket.id);
    token2 = await betaToken(roomId, id_b);

    io.to(socket.id).emit('receiveRandomToken', token1);
    io.to(id_b).emit('receiveRandomToken', token2);
  });

  socket.on('rejected', (id_b) => {
    console.log("rejected is triggred");
    // io.to(id_b).emit("rejectedCallAgain");
    callrequest(id_b);
    });

  socket.on('disconnectBeforeCall', (myId) => {
    console.log("disconnectBeforeCall is triggred")
    var index = array.indexOf(myId);
    if (index !== -1) {
      array.splice(index, 1);
    } else {
      console.log("UserID Not found!!!");
    }
    console.log('-------- Call Disconnected Before Connection -----------');
    });

  socket.on('disconnect', () => {
    console.log('-------- User Disconnected -----------');
    });
});

function pickRandomUser(){
  var min = 0;
  var max = mylist.length;
  return Math.floor(Math.random() * (max - min)) + min;
}

// console.log(pickRandomUser());

function generateRoomId() {
  return (Math.floor(1000 + Math.random() * 9000)).toString();
}

async function callrequest(myID){
  if (mylist.length > 0){
    console.log("length > 0 triggered");
    userAindex = pickRandomUser();
    console.log("user index is: " + userAindex);
    userAid = mylist[userAindex];
    console.log("User A id is: " + userAid);
    mylist.splice(userAindex, 1);
    console.log(mylist);
    io.to(userAid).emit("callRequest", myID);
  } else 
  if (mylist.length == 0){
    console.log("length: " + mylist.length.toString());
    mylist.push(myID);
    console.log(mylist);
    console.log("length is: " + mylist.length.toString());
  }
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});  