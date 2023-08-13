const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const message = { "data":{"message":"selamat datang di Websocket Paylite Broadcast!"}}
      client.send(JSON.stringify(message)); // Kirim pesan dalam format JSON
    }
  });

  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
app.get('/', (req, res) =>{
  res.send("Server Broadcast Bekerja!");
})
app.post('/broadcast', (req, res) => {
  const message = req.body.message;

  if (message) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message)); // Kirim pesan dalam format JSON
      }
    });
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'No message provided' });
  }
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
