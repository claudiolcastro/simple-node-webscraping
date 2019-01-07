const express = require('express');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ignore Favicon request
app.use((request, response, next) => {
  if (request.url === 'favicon.ico') {
    response.writeHead(200, { 'Content-Type': 'image/x-icon' });
    response.end();
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.info('Application runing at port 3000');
});

app.use('/', require('./routes'))

