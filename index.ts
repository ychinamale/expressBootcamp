const http = require('http');

const HOST = 'localhost'; // 127.0.0.1
const PORT = 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'application/json',
  });
  res.end(JSON.stringify({
    data: 'Hello from the server side',
  }, null, 2));
});

server.listen(PORT, HOST, () => {
  console.log(`Listening on port ${8000}`);
});
