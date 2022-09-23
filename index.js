const express = require('express');
const app = express();
const fs = require('fs');
const Handlebars = require('handlebars');

const data = require('./data.json');

const templateProductList = fs.readFileSync('./templates/productList.html', 'utf-8');
const templateProductDetails = fs.readFileSync('./templates/productDetails.html', 'utf-8');

// function to create HTML pages from templates
const createHTML = (barsHTML, json) => {
  const template = Handlebars.compile(barsHTML);
  return template(json);
}

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
  res.set({ 'content-type': 'text/html' });
  res.send(createHTML(templateProductList, data));
})

app.get('/product/:id', (req, res) => {
  res.set({ 'content-type': 'text/html' });
  res.send(createHTML(templateProductDetails, data.products[req.params.id]));
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
