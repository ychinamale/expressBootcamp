const http = require('http');
const url = require('url');
const fs = require('fs');

const HOST = 'localhost'; // 127.0.0.1
const PORT = 8000;

// Function to promisify a file read
const readFileProm = (filePath) => new Promise<string>((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) { reject(err); }
    else { resolve(data); }
  })
})

let fileData;
let fileDataObj;

// reading file once
readFileProm(`${__dirname}/data.json`)
  .then((data) => {
    fileData = data;
    fileDataObj = JSON.parse(data);
  })

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/overview' || pathName === '/' ) {
    res.end('This is the overview')
  } else if (pathName === '/product') {
    res.end('This is now the product page')
  } else if (pathName === '/api') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(fileData);
  } else {
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(JSON.stringify({
      error: 'Page does not exist',
    }, null, 2));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Listening on port ${8000}`);
});
