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

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.info(`Application runing at ${host}, port ${port}`);
});

app.use('/', require('./routes'))

