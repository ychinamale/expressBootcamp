const fs = require('fs');

// Promisifying the readFile function
const readFilePromise = () => new Promise((resolve, reject) => {
  fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

// Promisifying the writeFile function
const writeFilePromise = (data) => new Promise((resolve, reject) => {
  fs.writeFile('output.txt', data, (err) => {
    if (err) reject(err);
    resolve('success');
  });
});

readFilePromise()
  .then((data) => {
    console.log(data);
    return data;
  })
  .then((data) => {
    writeFilePromise(`Add stuff for output. But input was 👉🏾 ${data}`);
  })
  .catch((err) => {
    console.error(`😭 ${err}`);
  });
