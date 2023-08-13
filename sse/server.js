const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*' // Set CORS header to allow all origins
  });

  // Sending an initial comment to establish the SSE connection
  res.write(': Connected\n\n');
  var loop = 0;
  // Sending data to the client every second
  const intervalId = setInterval(() => {
    const data = new Date().toISOString();
    // res.write(`data: ${data}\n\n`);
    const nama = "hey Faqih";
    const response = {"data":{"message":nama, "index":loop}}
    res.write(`data: ${JSON.stringify(response)}\n\n`);
    loop++;
  }, 1000);
  // Clean up when the client disconnects
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
