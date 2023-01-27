const {betaToken} = require('./livekitToken');


const express = require('express');
const app = express();

app.get('/',async (req, res) => {
  const participantName = req.query.id;

  let token = await betaToken("testRoom", participantName);
  res.send(token);
});

app.get('/hello',async (req, res) => {
 console.log("working");
  res.send("han g");
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});