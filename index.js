const express = require('express');
const app = express();
const fs = require('fs');

const HOST = 'localhost'; // 127.0.0.1
const PORT = 8000;

// Function to promisify a file read
const readFileProm = (filePath) => new Promise((resolve, reject) => {
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

app.get(['/', '/overview'], (_, res) => {
  res.end('This is the overview')
})

app.get('/product', (_, res) => {
  res.end('This is now the product page')
})

app.get('/api', (_, res) => {
  res.set({ 'content-type': 'application/json' })
  res.end(fileData);
})

app.use((_, res, next) => {
  res.set({ 'content-type': 'application/json' })
  res.status(404).end(JSON.stringify({ error: 'Page does not exist' }));
})
  
app.listen(PORT, HOST, () => {
  console.log(`Listening on port ${PORT}`);
});
